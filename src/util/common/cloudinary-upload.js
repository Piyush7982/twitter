const { CLOUDINARY_CONFIG } = require("../../config");
const path = require("path");
async function uploadImage(filename) {
  try {
    // console.log(filename);
    if (!filename) {
      throw new Error("filename is required");
    }
    const result = await CLOUDINARY_CONFIG.uploader.upload(
      path.resolve(__basedir, `../public/temp/${filename}`),
      {
        use_filename: true,
        unique_filename: false,

        resource_type: "auto",
        overwrite: true,
      }
    );

    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = { uploadImage };
