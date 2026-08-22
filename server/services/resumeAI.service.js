const generateAIResponse = require("./groq.service");


const analyzeResumeAI = async (
    resumeText,
    jobDescription
) => {

const prompt = `

You are a professional ATS Resume Analyzer.

Your task is to compare a resume with a job description.

STRICT RULES:

- Same resume and same job description must always produce the same ATS score.
- Never randomly change scores.
- Never guess skills.
- Never add technologies that are not present.
- Only compare technical skills.

Consider only:

- Programming languages
- Frameworks
- Libraries
- Databases
- Cloud technologies
- Developer tools


Ignore:

- Name
- Email
- Location
- College
- Formatting
- Personal information


SCORING FORMULA:

ATS Score =
(Matched Required Skills / Total Required Skills) * 100


Example:

Job requires:
React, Node.js, MongoDB, AWS

Resume has:
React, Node.js, MongoDB

Score:
75


Rules:

- Missing important skills reduce score.
- Matched skills increase score.
- Round score to nearest integer.


Resume:

${resumeText}


Job Description:

${jobDescription}


Return ONLY JSON:

{
 "atsScore":0,
 "matchedSkills":[],
 "missingSkills":[],
 "suggestions":[]
}


No markdown.
No explanation.
No extra text.

`;

const response = await generateAIResponse(prompt);


const cleanResponse = response
.replace(/```json/g, "")
.replace(/```/g, "")
.trim();


try {

    return JSON.parse(cleanResponse);

} catch(error){

    console.log("AI JSON ERROR:", cleanResponse);

    throw new Error("Invalid AI response format");

}


};


module.exports = {
    analyzeResumeAI
};