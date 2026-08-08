import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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
  //get user details from frontend
  const { username, password, fullName, email } = req.body;

  //empty field check
  if (
    [username, password, fullName, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(404, "Bad request,All fields are Required!");
  }

  //--> ill do this for email syntax validation
  // if((email.toLowerCase()))

  //check if user already existing in db: email, username
  const isUserExisting = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExisting) {
    throw new ApiError(409, "existing user!");
  }

  //check for images , check for avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file Required");
  }
  const avatarRef = await uploadOnCloudinary(avatarLocalPath);
  const coverImageRef = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarRef) {
    throw new ApiError(400, "Avatar is Required!");
  }

  //crreat user object - create enty in db
  const userInst = await User.create({
    fullName,
    email,
    username,
    password,
    coverImage: coverImageRef?.url || "",
    avatar: avatarRef?.url || "",
  });

  //remove password and refresh token and show them to userfrontend res

  const DBuser = await User.findById(userInst._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!DBuser) {
    throw new ApiError(500, "userwas not created!");
  }

  //return yes
  return res
    .status(201)
    .json(new ApiResponse(200, DBuser, "user Registered Sucess!"));
});
