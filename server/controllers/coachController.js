const {
    generateCoachResponse
} = require("../services/coachAI.service");


const chatWithCoach = async (req, res) => {

    try {

        const { question } = req.body;

        if (!question || !question.trim()) {

            return res.status(400).json({
                success: false,
                message: "Question is required"
            });

        }


        const answer = await generateCoachResponse(
            question.trim()
        );


        res.status(200).json({

            success: true,

            answer: answer

        });

    } catch (error) {

        console.log(
            "COACH ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {
    chatWithCoach
};