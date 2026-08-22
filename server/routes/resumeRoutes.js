const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const protect = require("../middleware/authMiddleware");


const {
analyzeUploadedResume
}=require("../controllers/resumeController");



router.post(

"/analyze-upload",

protect,

upload.single("resume"),

analyzeUploadedResume

);



module.exports = router;