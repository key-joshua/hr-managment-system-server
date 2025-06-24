import dotenv from 'dotenv';
import { v2 } from 'cloudinary';
import StatusCodes from 'http-status-codes';
import responseUtils from '../utils/responseUtils';

dotenv.config();

v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const uploadSingleFileService = async (req, res, next) => {
  const file = req?.files?.file;

  if (!file) {
    return next();
  }

  const filename = file.originalFilename || '';
  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();

  const allowedExtensions = ['.jpg', '.png'];

  if (!allowedExtensions.includes(extension)) {
    responseUtils.handleError(
      StatusCodes.BAD_REQUEST,
      'Invalid file type. Accepted file types are: .jpg, .png'
    );
    return responseUtils.response(res);
  }

  try {
    const result = await v2.uploader.upload(file.path);
    req.body.file = result?.url;
    return next();
  } catch (error) {
    responseUtils.handleError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to upload file. Please try again.'
    );
    return responseUtils.response(res);
  }
};

const uploadMultipleDocumentsService = async (req, res, next) => {
  const files = req?.files?.attachments;

  if (!files || (Array.isArray(files) && files.length === 0)) {
    return next();
  }

  const documentsArray = Array.isArray(files) ? files : [files];
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const uploadedUrls: string[] = [];

  try {
    for (const file of documentsArray) {
      const filename = file.originalFilename || '';
      const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        responseUtils.handleError(
          StatusCodes.BAD_REQUEST,
          'Invalid file type. Accepted file types are: .pdf, .doc, .docx'
        );
        return responseUtils.response(res);
      }

      const result = await v2.uploader.upload(file.path, {
        resource_type: 'raw',
      });

      uploadedUrls.push(result?.url);
    }

    req.body.attachments = uploadedUrls;
    return next();
  } catch (error) {
    responseUtils.handleError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to upload documents. Please try again.'
    );
    return responseUtils.response(res);
  }
};

export { 
  uploadSingleFileService,
  uploadMultipleDocumentsService
};
