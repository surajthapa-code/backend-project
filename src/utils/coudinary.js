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

    // Execute Cloudinary asset upload
    const res = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully to Cloudinary:", res.url);

    // Clear local temporary file from disk upon SUCCESS
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }

    return res;
  } catch (error) {
    // Log the exact error object to console
    console.error("Cloudinary execution failed! Details:", error);

    // Clear local temporary file from disk upon FAILURE
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }

    return null;
  }
};
