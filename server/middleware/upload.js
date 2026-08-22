const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});


const upload = multer({
    storage:storage,
fileFilter:(req,file,cb)=>{

    console.log("FILE TYPE:", file.mimetype);
    console.log("FILE NAME:", file.originalname);


    if(file.originalname.toLowerCase().endsWith(".pdf")){
        cb(null,true);
    }
    else{
        cb(new Error("Only PDF allowed"),false);
    }

}
});


module.exports = upload;