import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/coudinary.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  path: "/",
};

//--- token generation
const accessAndRefreshTokenGeneration = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "Token generation failed!");
  }
};

//---register user
export const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already existing in db: email, username
  //check for images , check for avatar
  //upload them to cloudinary
  //crreat user object - create enty in db
  //remove password and refresh token and show them to userfrontend res
  //check for user creation
  //return yes

  //get user details from frontend
  const { username, password, fullName, email } = req.body;

  //empty field check
  if (
    [username, password, fullName, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(404, "Bad request, All fields are Required!");
  }

  //--> email syntax validation --
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

//---login user
export const loginUser = asyncHandler(async (req, res) => {
  //data from req body
  //validation - not empty
  //search if user already exist
  // Search user already exists.
  //password check
  //access token and refresh token generation
  //send them in cookie and send user details in response
  //return success response

  //data from req body
  const { email, username, password } = req.body;

  //validation - not empty
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }
  //search if user already exist
  const isUserExisting = await User.findOne({
    $or: [{ email }, { username }],
  });

  // Search user already exists.
  if (!isUserExisting) {
    throw new ApiError(404, "user not found!");
  }

  //password check
  const isPasswordCorrect = await isUserExisting.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password!");
  }

  //access token and refresh token generation
  const { accessToken, refreshToken } = await accessAndRefreshTokenGeneration(
    isUserExisting._id
  );

  //get user details from db
  const LoggedInUser = await User.findById(isUserExisting._id).select(
    "-password -refreshToken"
  );
  if (!LoggedInUser) {
    throw new ApiError(500, "user not found!");
  }

  //send them in cookie and send user details in response
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: LoggedInUser, accessToken, refreshToken },
        "user logged in sucess!"
      )
    );
});

//---logout user
export const logoutUser = asyncHandler(async (req, res) => {
  //get user id from req.user
  //find user in db
  //remove refresh token from db
  //clear cookies and send response
  const userInfo = req.user;
  const LoggedOutUser = await User.findByIdAndUpdate(
    userInfo._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logout success"));
});

//end point
export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken || incomingRefreshToken == undefined) {
      throw new ApiError(401, "UnAuthorised Request!");
    }

    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const userInfo = await User.findById(decodedToken._id);

    if (!userInfo) {
      throw new ApiError(404, "Invalid RefreshToken!");
    }
    if (incomingRefreshToken !== userInfo.refreshToken) {
      throw new ApiError(401, "Refresh Token is Expired or used!");
    }

    const { accessToken, refreshToken } = await accessAndRefreshTokenGeneration(
      userInfo._id
    );
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, { accessToken, refreshToken }, "refresh done")
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "error while token refresh!");
  }
});

//password change
export const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!(oldPassword || newPassword)) {
    throw new ApiError(400, "Bad request: required fields are missing");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await User.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed sucessfully"));
});

//get user
export const getUser = asyncHandler(async (req, res) => {
  // const userData = await User.findById(req.user?._id);
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user fetch sucess"));
});

//update userDetails
export const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!(fullName && email)) {
    throw new ApiError(400, {}, "invalid request all fill required fields ");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },
    { new: true }
  ).select("-password");
  return res.status(201).json(201, updatedUser, "Details updated sucess");
});

//updateUserAvatar
export const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "bad request during avatar update");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "error while uploading avatar on cloudinary");
  }
  const avatarUpdatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  if (!avatarUpdatedUser) {
    throw new ApiError(404, "error while updating avatar in db");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, avatarUpdatedUser, "avatar url update sucess"));
});

//coverImageUpdatedUser
export const updateUsercoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "bad request during coverImage update");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(400, "error while uploading coverImage on cloudinary");
  }
  const coverImageUpdatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  if (!coverImageUpdatedUser) {
    throw new ApiError(404, "error while updating coverImage in db");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, coverImageUpdatedUser, "coverImage url update sucess"));
});