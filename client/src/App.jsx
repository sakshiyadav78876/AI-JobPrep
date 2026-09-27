import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import InterviewPrep from "./pages/InterviewPrep";
import AICoach from "./pages/AICoach";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/interview-prep" element={<InterviewPrep />} />

        <Route
  path="/ai-coach"
  element={<AICoach />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;