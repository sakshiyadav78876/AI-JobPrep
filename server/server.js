require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const generateAIResponse = require("./services/groq.service");


const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());







// Routes
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));


// Default Route
app.get("/", (req, res) => {

    res.send("🚀 AI Job Preparation Platform API is Running");

});


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});