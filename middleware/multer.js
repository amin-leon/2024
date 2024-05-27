// Set up multer for image upload
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store images in the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

export const upload = multer({ storage });
