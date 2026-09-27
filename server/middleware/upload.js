const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

// Make sure uploads folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + path.basename(file.originalname)
        );
    }
});

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        console.log("FILE TYPE:", file.mimetype);
        console.log("FILE NAME:", file.originalname);

        if (file.originalname.toLowerCase().endsWith(".pdf")) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF allowed"), false);
        }
    }
});

module.exports = upload;