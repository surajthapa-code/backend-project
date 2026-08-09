import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token is missing!");
    }

    const isTokenValid = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!isTokenValid) {
      throw new ApiError(401, "Invalid access token!");
    }

    const userData = await User.findById(isTokenValid._id).select(
      "-password -refreshToken"
    );

    console.log(isTokenValid);
    if (!userData) {
      throw new ApiError(404, "User not found!");
    }
    req.user = userData;
    console.log(userData, "auth middleware work done here");
    next();
    
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access token");
  }
});
