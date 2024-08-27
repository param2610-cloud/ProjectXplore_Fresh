  import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/temp');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        
        const filetypes = /jpeg|jpg|png|gif|mp4|pdf/;
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only images, videos, and PDFs are allowed!"));
        }
    },
});
