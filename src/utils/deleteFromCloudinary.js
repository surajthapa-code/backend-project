import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Changed parameter name to 'urlOrId' to make it flexible
export const deleteFromCloudinary = async function (
  urlOrId,
  resourceType = "image"
) {
  try {
    if (!urlOrId) return null;

    // extract the publicId
    let publicId = urlOrId;
    if (urlOrId.includes("://res.cloudinary.com")) {
      const afterVersion = urlOrId.split("/v")[1];
      const pathWithoutVersion = afterVersion.split("/").slice(1).join("/");
      publicId = pathWithoutVersion.split(".")[0];
    }

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
