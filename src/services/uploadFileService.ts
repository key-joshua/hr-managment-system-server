import dotenv from 'dotenv';
import { v2 } from 'cloudinary';

dotenv.config();

v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const uploadFileService = async (req, res, next) => {
  if (!req.files.file) {
    req.file = null;
    return next();
  }

  const getDocName = req.files.file.originalFilename;
  const docLength = getDocName.length;
  const point = getDocName.lastIndexOf('.');
  const getExtensionFile = getDocName.substring(point, docLength);
  const lowCaseExtensionFile = getExtensionFile.toLowerCase();

  if (lowCaseExtensionFile === '.jpg' || lowCaseExtensionFile === '.png' || lowCaseExtensionFile === '.pdf') {
    const result = await v2.uploader.upload(req.files.file.path);

    req.body.file = result?.url;
    return next();
  }

  if (lowCaseExtensionFile === '.mp4' || lowCaseExtensionFile === '.mp3') {
    const result = await v2.uploader.upload(req.files.file.path, { resource_type: "video", chunk_size: 6000000, eager: [{ width: 300, height: 300, crop: "pad", audio_codec: "none" }, { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }], eager_async: true, });
    
    req.body.file = result?.url;
    return next();
  }
};

export default uploadFileService;
