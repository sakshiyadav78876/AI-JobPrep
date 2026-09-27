const generateAIResponse = require("./groq.service");

const generateCoachResponse = async (question) => {

    const prompt = `
You are an AI placement preparation coach.

Help the student prepare for software engineering placements.

The student can ask anything related to:
- Java
- DSA
- SQL
- DBMS
- OOP
- OS
- Computer Networks
- Web Development
- React
- Node.js
- Express
- MongoDB
- Coding problems
- Technical interviews
- HR interviews
- Aptitude
- Resume preparation
- General placement preparation

Give clear, practical and beginner-friendly explanations.

If the student asks a technical question:
- Explain the concept simply.
- Give an example when useful.
- Mention important interview points.
- Avoid unnecessary advanced details.

If the student asks a coding question:
- Explain the approach first.
- Then provide Java code when appropriate.
- Mention time and space complexity.

If the student asks an interview question:
- Explain what the interviewer expects.
- Give a strong sample answer when appropriate.

Do not make the answer unnecessarily long.

Student's question:

${question}
`;

    const response = await generateAIResponse(
        prompt,
        `
        You are a helpful AI placement coach.

        Your job is to help a Computer Science student
        understand concepts, practice coding, and prepare
        for software engineering placement interviews.

        Be clear, accurate, practical and encouraging.

        Do not pretend to know personal information
        that the student has not provided.
        `
    );

    return response.trim();
};

module.exports = {
    generateCoachResponse
};