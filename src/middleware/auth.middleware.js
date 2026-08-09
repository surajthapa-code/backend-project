import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accesstoken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token is missing!");
    }
    console.log(token);
    const istokenValid = await jwt.verify(
      token,
      process.env.ACCESS_tOKEN_SECREt
    );

    if (!istokenValid) {
      throw new ApiError(401, "Invalid access token!");
    }

    const userData = await User.findById(istokenValid._id).select(
      "-password -refreshtoken"
    );

    console.log(istokenValid);
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
