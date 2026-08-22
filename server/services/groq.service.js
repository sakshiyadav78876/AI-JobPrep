const Groq = require("groq-sdk");


const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


const generateAIResponse = async(prompt)=>{

    try{


   const completion = await client.chat.completions.create({

    model: "openai/gpt-oss-120b",

    messages:[
        {
            role:"system",
            content:
            `
            You are a deterministic ATS resume analyzer.

            Always give consistent results.
            Same input must always produce same output.
            Never randomly change scores.
            Return only JSON.
            `
        },

        {
            role:"user",
            content:prompt
        }
    ],


    temperature:0,

    max_tokens:2000

});



        return completion
        .choices[0]
        .message
        .content;



    }
    catch(error){

        console.log(
            "Groq Error:",
            error.message
        );

        throw error;

    }

};



module.exports = generateAIResponse;