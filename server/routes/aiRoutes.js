const express = require("express");
const generateAIResponse = require("../services/groq.service");

const router = express.Router();


router.post("/analyze", async (req, res) => {

    try {

        console.log("Received Body:", req.body);


        const { resume, jobDescription } = req.body || {};


        if (!resume || !jobDescription) {

            return res.status(400).json({
                success: false,
                message: "Resume and Job Description are required"
            });

        }


        const prompt = `
You are an expert technical recruiter.

Analyze the resume against the job description.

Resume:
${resume}


Job Description:
${jobDescription}


Give:

1. Skill Match Percentage
2. Current Skills
3. Missing Skills
4. Skill Gap Analysis
5. Learning Roadmap
6. Technical Interview Questions
7. HR Interview Questions

`;


        const result = await generateAIResponse(prompt);


        res.json({
            success: true,
            analysis: result
        });


    } catch (error) {

        console.log("AI Route Error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;