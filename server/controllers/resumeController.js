const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const { analyzeResumeAI } = require("../services/resumeAI.service");


// Resume Upload + Job Description + AI Analysis

const analyzeUploadedResume = async(req,res)=>{

try{


const file = req.file;

const {jobDescription}=req.body;



if(!file){

return res.status(400).json({

success:false,
message:"Resume required"

});

}



if(!jobDescription){

return res.status(400).json({

success:false,
message:"Job description required"

});

}




const filePath = path.join(

__dirname,

"..",

file.path

);



const dataBuffer = fs.readFileSync(filePath);



const pdfData = await pdfParse(dataBuffer);




// AI Analysis

const analysis = await analyzeResumeAI(

pdfData.text,

jobDescription

);




// Save in MongoDB

const resume = await Resume.create({

user:req.user._id,

fileName:file.originalname,

filePath:file.path,

resumeText:pdfData.text,

jobDescription:jobDescription,

analysis:analysis

});




res.status(200).json({

success:true,

message:"Resume analyzed successfully",

resume

});



}
catch(error){


console.log("ANALYSIS ERROR:",error);


res.status(500).json({

success:false,

message:error.message

});


}


};



module.exports={

analyzeUploadedResume

};