import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/coudinary.js";

//get user details from frontend
//validation - not empty
//check if user already existing in db: email, username
//check for images , check for avatar
//upload them to cloudinary
//crreat user object - create enty in db
//remove password and refresh token and show them to userfrontend res
//check for user creation
//return yes

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, FullName, email } = req.body;

  //empty field check
  if (
    [username || password || FullName || email].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(404, "Bad request,All fields are Required!");
  }

  //--> ill do this for email syntax validation
  // if((email.toLowerCase()))

  //existing user check
  const isUserExisting = await User.findOne({
    $or: [{ usernam }, { email }],
  });
  if (isUserExisting) {
    throw new ApiError(409, "existing user!");
  }

  //file check
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file Required");
  }
  const avatarRef = await uploadOnCloudinary(avatarLocalPath);
  const coverImageRef = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarRef) {
    throw new ApiError(400, "Avatar is Required!");
  }

  //create user object and db entry
  const userInst = await User.create({
    FullName,
    email,
    username,
    password,
    coverImage: coverImageRef?.url || "",
    avatar: avatarRef?.url || "",
  });

  const DBuser = await userInst
    .findById(userInst._id)
    .select("-password -refreshToken");

  if (!DBuser) {
    throw new ApiError(500, "userwas not created!");
  }
  
  //res
  return res
    .status(201)
    .json(new ApiResponse(200, DBuser, "user Registered Sucess!"));
});
