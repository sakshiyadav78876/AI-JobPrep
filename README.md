# AI JobPrep

AI JobPrep is a full-stack AI-powered placement preparation platform designed to help students prepare for software engineering placements through resume analysis, interview preparation, and an AI placement coach.

The platform combines a React frontend, Node.js/Express backend, MongoDB database, JWT-based authentication, and Groq-powered AI services to provide personalized placement preparation.

---

## Overview

Preparing for software engineering placements often requires students to manage multiple activities such as:

- Resume optimization
- Job description analysis
- Technical interview preparation
- Coding preparation
- HR interview preparation
- Communication practice
- General placement guidance

AI JobPrep brings these activities together into a single platform.

Users can upload their resume, provide a job description, receive an AI-powered resume analysis, generate interview questions, and interact with an AI placement coach.

---

## Features

### 1. Resume Analyzer

The Resume Analyzer allows users to upload a PDF resume and provide a target job description.

The system:

- Accepts PDF resumes
- Extracts resume text
- Analyzes the resume against the job description
- Identifies matching skills
- Identifies missing skills
- Generates improvement recommendations
- Produces an ATS-oriented analysis

This helps users understand how well their resume aligns with a particular job description.

---

### 2. AI Interview Preparation

The Interview Prep module generates personalized preparation material based on the user's resume.

It provides:

- Technical interview questions
- Coding questions
- HR questions
- Communication questions
- Important points to remember

The goal is to help students practice questions that are relevant to their technical background and placement preparation.

---

### 3. AI Placement Coach

AI Coach provides an interactive AI-based placement preparation assistant.

Students can ask questions related to:

- Java
- DSA
- SQL
- DBMS
- OOP
- Operating Systems
- Computer Networks
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

The coach provides beginner-friendly explanations, examples, interview tips, and coding guidance when appropriate.

---

### 4. Authentication

The application includes user authentication using:

- User registration
- User login
- JWT authentication
- Protected API routes
- Password hashing using bcrypt

Protected features require a valid authentication token.

---

### 5. Dashboard

The dashboard provides a central place for users to access the major features of the platform.

It connects:

- Resume Analyzer
- Interview Preparation
- AI Coach
- User profile
- Authentication

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- SCSS
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- PDF parsing

### AI

- Groq API
- `openai/gpt-oss-120b`

### Development & Deployment

- Git
- GitHub
- Render
- Vercel

---

## System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      + Vite          │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Node.js + Express    │
                    │      Backend         │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
        ┌─────────────────┐          ┌─────────────────┐
        │    MongoDB      │          │   Groq AI API   │
        │    Database     │          │                 │
        └─────────────────┘          └─────────────────┘




Authentication Flow
User
  ↓
Register / Login
  ↓
Backend Authentication
  ↓
Password Verification
  ↓
JWT Token Generated
  ↓
Token Stored on Client
  ↓
Protected API Requests




Resume Analysis Flow
User uploads resume
        ↓
PDF received by backend
        ↓
Resume text extracted
        ↓
Job description received
        ↓
AI analysis generated
        ↓
Skills compared
        ↓
Recommendations generated
        ↓
Analysis stored in MongoDB
        ↓
Result displayed to user




Interview Preparation Flow
Authenticated User
        ↓
Request Interview Preparation
        ↓
Latest Resume Retrieved
        ↓
Resume Information Sent to AI
        ↓
Questions Generated
        ↓
Technical / Coding / HR /
Communication / Must Remember
        ↓
Results Displayed
AI Coach Flow
User Question
      ↓
Authenticated API Request
      ↓
Coach Controller
      ↓
AI Coach Service
      ↓
Groq AI
      ↓
Generated Response
      ↓
Frontend Chat Interface
