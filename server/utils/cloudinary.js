const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const fullPath = path.resolve(__dirname, "..", "public", localFilePath);
    const response = await cloudinary.uploader.upload(fullPath, {
      resource_type: "auto",
    });
    console.log("File is uploaded on cloudinary", response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(fullPath); // remove the locally saved temporary file as the upload option got failed
    return null;
  }
};

module.exports = { uploadOnCloudinary };
