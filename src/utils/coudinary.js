import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async function (localfilepath) {
  try {
    if (!localfilepath) return null;
    //upload now

    const res = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    console.log("file upload sucess", res.url);
    return res;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};
