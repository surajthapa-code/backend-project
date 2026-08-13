import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async function (publicId, resourceType = "image") {
  try {
    if (!publicId) return null;

    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Deleted from Cloudinary:", res.result);
    return res;
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    return null;
  }
};