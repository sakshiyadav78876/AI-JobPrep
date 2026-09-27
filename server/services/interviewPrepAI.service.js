const generateAIResponse = require("./groq.service");

const generateInterviewPrep = async (
    resumeText,
    jobDescription,
    analysis
) => {

    const prompt = `

You are an expert technical interviewer helping a student prepare
for software engineering placements.

Based on the candidate's resume, job description, and resume analysis,
generate interview preparation material.

IMPORTANT RULES:

- Questions must be based primarily on the candidate's actual resume.
- Never invent technologies or projects that are not present in the resume.
- Give practical placement-level questions.
- Avoid extremely advanced questions unless the resume clearly shows advanced knowledge.
- Questions should be suitable for a Computer Science / Software Engineering placement interview.
- Focus on concepts that an interviewer is likely to ask from the candidate's resume.
- For coding questions, prefer common placement-level DSA patterns.
- HR questions should help the candidate explain their projects, strengths,
  weaknesses, goals, and experience.
- Communication tasks should improve interview communication.
- Must Remember should contain short important points the candidate should revise
  before an interview.

Candidate Resume:

${resumeText}

Job Description:

${jobDescription || "Not provided"}

Resume Analysis:

${JSON.stringify(analysis || {})}

Return ONLY valid JSON.

The JSON structure must be exactly:

{
    "technical": [
        {
            "question": "",
            "topic": "",
            "difficulty": "Easy",
            "expectedPoints": []
        }
    ],

    "coding": [
        {
            "question": "",
            "topic": "",
            "difficulty": "Easy",
            "expectedApproach": ""
        }
    ],

    "hr": [
        {
            "question": "",
            "whyAsked": "",
            "answerPoints": []
        }
    ],

    "communication": [
        {
            "task": "",
            "timeLimit": "60 seconds",
            "focus": []
        }
    ],

    "mustRemember": []
}

Generate exactly:

Technical: 10 questions
Coding: 5 questions
HR: 5 questions
Communication: 5 tasks
Must Remember: 10 points

No markdown.
No explanation.
No extra text.

`;

    const response = await generateAIResponse(
        prompt,
        `
        You are an expert software engineering interview
        preparation assistant.

        Generate interview preparation material based strictly
        on the candidate's resume, job description,
        and resume analysis.

        Do not invent technologies, projects, skills,
        or experience.

        Return only valid JSON.

        Do not return markdown.
        Do not return explanations outside the JSON.
        `
    );

    const cleanResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {

        return JSON.parse(cleanResponse);

    } catch (error) {

        console.log(
            "INTERVIEW AI JSON ERROR:"
        );

        console.log(
            cleanResponse
        );

        throw new Error(
            "Invalid interview AI response format"
        );
    }
};

module.exports = {
    generateInterviewPrep
};