const Resume = require("../models/Resume");
const {
  generateInterviewPrep
} = require("../services/interviewPrepAI.service");

const generateInterviewQuestions = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user._id
    }).sort({
      createdAt: -1
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Please analyze your resume first."
      });
    }

    if (!resume.resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text not found."
      });
    }

    const interviewPrep = await generateInterviewPrep(
      resume.resumeText,
      resume.jobDescription,
      resume.analysis
    );

    res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      interviewPrep
    });

  } catch (error) {

    console.log(
      "INTERVIEW PREP ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  generateInterviewQuestions
};