const fs = require("fs");
const multer = require("multer");
const { cloudinaryUtil, errorResponse } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__basedir, "../public/temp"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

async function imageUploadMiddleware(req, res, next) {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) {
        fs.unlinkSync(req.file.path);
        return res.status(500).json({ error: err.message });
      }
      if (req.file) {
        const cloudinaryLink = await cloudinaryUtil.uploadImage(
          req.file.filename
        );
        fs.unlinkSync(req.file.path);
        req.file.url = cloudinaryLink;
        next();
      } else {
        return next();
      }
    } catch (error) {
      console.log(error);
      errorResponse.Message = error.Message;
      errorResponse.Error = error.name;
      errorResponse.StatusCode = StatusCodes.REQUEST_TIMEOUT;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
  });
}

module.exports = { imageUploadMiddleware };
