import { v2 as cloudinar } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localfilepath) {
  try {
    if (!localfilepath) return null;
    //upload now

    const res = await cloudinary.uploader
      .upload(localfilepath)
      .then((result) => console.log(res));
    return res;
  } catch (error) {
    fs.unlinkSync(localfilepath);
  }
};
