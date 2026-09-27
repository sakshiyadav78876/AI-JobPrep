import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";

import "../../styles/dashboard.css";

const InterviewPrep = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [error, setError] = useState("");

  // ---------------- AUTH ----------------

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // ---------------- LOGOUT ----------------

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---------------- GENERATE QUESTIONS ----------------

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setInterviewPrep(null);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/interview/generate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setInterviewPrep(res.data.interviewPrep);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to generate interview preparation."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-root bg-[#030014] min-h-screen text-slate-200 font-sans">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-nav">

        <div className="logo">
          AI JobPrep
        </div>

        <div className="nav-links">

          <NavLink to="/dashboard">
             Resume Analyzer
          </NavLink>


          <NavLink to="/interview-prep">
            Interview Prep
          </NavLink>

          <NavLink to="/ai-coach">
    AI Coach
  </NavLink>

        </div>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-20">

        {/* ================= HEADER ================= */}

        {!interviewPrep && !loading && (
          <header className="mb-12">

            <div className="flex items-center gap-3 mb-4">

              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                AI Powered
              </span>

              <span className="text-slate-600">
                /
              </span>

              <span className="text-slate-500 text-sm">
                Interview Preparation
              </span>

            </div>

            <h1 className="text-[42px] md:text-[48px] font-bold text-white leading-tight mb-4">
              Prepare Smarter.
              <span className="text-indigo-500">
                {" "}Interview Better.
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Generate personalized interview questions based on
              your analyzed resume, skills, projects and target role.
            </p>

          </header>
        )}


        {/* ================= HERO CARD ================= */}

        {!interviewPrep && !loading && (

          <section className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 mb-12">

            {/* Background glow */}

            <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-600/10 blur-3xl rounded-full"></div>

            <div className="relative">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

                <div className="max-w-2xl">

                  <div className="w-14 h-14 flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6">

                    <span className="text-2xl">
                      ✦
                    </span>

                  </div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your AI Interview Coach
                  </h2>

                  <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                    Your resume has already been analyzed.
                    Now turn that analysis into focused interview
                    preparation without uploading your resume again.
                  </p>

                  <button
                    onClick={handleGenerate}
                    className="px-9 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Generate Questions
                  </button>

                </div>


                {/* Stats */}

                <div className="grid grid-cols-2 gap-4 min-w-[260px]">

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">

                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      Technical
                    </p>

                    <p className="text-3xl font-bold text-white">
                      10
                    </p>

                    <p className="text-slate-600 text-xs mt-1">
                      Questions
                    </p>

                  </div>


                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">

                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      Coding
                    </p>

                    <p className="text-3xl font-bold text-white">
                      5
                    </p>

                    <p className="text-slate-600 text-xs mt-1">
                      Problems
                    </p>

                  </div>


                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">

                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      HR
                    </p>

                    <p className="text-3xl font-bold text-white">
                      5
                    </p>

                    <p className="text-slate-600 text-xs mt-1">
                      Questions
                    </p>

                  </div>


                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">

                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">
                      Revision
                    </p>

                    <p className="text-3xl font-bold text-indigo-500">
                      10
                    </p>

                    <p className="text-slate-600 text-xs mt-1">
                      Key Points
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

        )}


        {/* ================= PREPARATION AREAS ================= */}

        {!interviewPrep && !loading && (

          <section>

            <div className="mb-7">

              <h2 className="text-2xl font-bold text-white mb-2">
                Preparation Areas
              </h2>

              <p className="text-slate-500">
                Your interview preparation covers the areas
                commonly tested in software engineering interviews.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Technical */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">

                <div className="flex items-start justify-between mb-6">

                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                    01
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    10 Questions
                  </span>

                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  Technical
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  Questions from your technologies, projects,
                  concepts and resume-specific technical skills.
                </p>

              </div>


              {/* Coding */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">

                <div className="flex items-start justify-between mb-6">

                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                    02
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    5 Problems
                  </span>

                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  Coding
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  Placement-level coding problems with expected
                  approaches and common DSA patterns.
                </p>

              </div>


              {/* HR */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">

                <div className="flex items-start justify-between mb-6">

                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                    03
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    5 Questions
                  </span>

                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  HR & Behavioral
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  Practice questions around your projects,
                  strengths, experience, goals and career journey.
                </p>

              </div>


              {/* Communication */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">

                <div className="flex items-start justify-between mb-6">

                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                    04
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    5 Tasks
                  </span>

                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  Communication
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  Short speaking and explanation tasks designed
                  to improve interview communication.
                </p>

              </div>

            </div>


            {/* Must Remember */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3 mb-3">

                    <span className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                      05
                    </span>

                    <h3 className="text-xl font-bold text-white">
                      Must Remember
                    </h3>

                  </div>

                  <p className="text-slate-400">
                    Important concepts and points to revise before
                    entering your interview.
                  </p>

                </div>

                <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-widest">
                  10 Key Points
                </span>

              </div>

            </div>

          </section>

        )}


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="flex flex-col items-center justify-center py-24 text-center">

            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-10"></div>

            <h2 className="text-2xl font-semibold text-white mb-3">
              Building your interview preparation...
            </h2>

            <p className="text-slate-500 max-w-md">
              AI is analyzing your resume and creating
              personalized technical, coding and HR questions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 w-full max-w-3xl">

              {[
                "Resume Analysis",
                "Question Generation",
                "Interview Preparation"
              ].map((step, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl"
                >

                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>

                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    {step}
                  </span>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* ================= ERROR ================= */}

        {error && !loading && (

          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mb-8">

            <p className="text-red-400 text-sm font-medium">
              {error}
            </p>

          </div>

        )}


        {/* ================= RESULTS ================= */}

        {interviewPrep && !loading && (

          <div className="animate-slide-up">

            <header className="mb-10 border-b border-slate-800 pb-8">

              <div className="flex items-center gap-3 mb-4">

                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                  AI Generated
                </span>

              </div>

              <h1 className="text-[40px] font-bold text-white mb-3">
                Your Interview Preparation
              </h1>

              <p className="text-slate-400 text-lg">
                Personalized questions generated from your resume.
              </p>

            </header>


            {/* Technical */}

            <section className="mb-14">

              <div className="flex items-end justify-between mb-6">

                <div>
                  <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                    01 / Technical
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    Technical Questions
                  </h2>
                </div>

                <span className="text-slate-500 text-sm">
                  {interviewPrep.technical?.length || 0} Questions
                </span>

              </div>


              <div className="space-y-4">

                {interviewPrep.technical?.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all"
                  >

                    <div className="flex gap-5">

                      <span className="text-indigo-500 font-black text-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">

                        <div className="flex flex-wrap gap-3 mb-3">

                          <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded text-[10px] font-bold uppercase tracking-wider">
                            {item.topic}
                          </span>

                          <span className="px-2 py-1 bg-slate-950 text-slate-500 border border-slate-800 rounded text-[10px] font-bold uppercase tracking-wider">
                            {item.difficulty}
                          </span>

                        </div>

                        <h3 className="text-lg font-semibold text-white leading-relaxed mb-4">
                          {item.question}
                        </h3>

                        <div>

                          <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">
                            Expected Points
                          </p>

                          <ul className="space-y-1">

                            {item.expectedPoints?.map((point, i) => (

                              <li
                                key={i}
                                className="text-slate-400 text-sm"
                              >
                                • {point}
                              </li>

                            ))}

                          </ul>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* Coding */}

            <section className="mb-14">

              <div className="flex items-end justify-between mb-6">

                <div>
                  <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                    02 / Coding
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    Coding Questions
                  </h2>
                </div>

                <span className="text-slate-500 text-sm">
                  {interviewPrep.coding?.length || 0} Problems
                </span>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {interviewPrep.coding?.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-indigo-500/30 transition-all"
                  >

                    <div className="flex justify-between items-start mb-5">

                      <span className="text-indigo-500 font-black text-xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="px-2 py-1 bg-slate-950 border border-slate-800 text-slate-500 rounded text-[10px] font-bold uppercase">
                        {item.difficulty}
                      </span>

                    </div>

                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">
                      {item.topic}
                    </p>

                    <h3 className="text-white font-semibold text-lg leading-relaxed mb-5">
                      {item.question}
                    </h3>

                    <div className="border-t border-slate-800 pt-4">

                      <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">
                        Expected Approach
                      </p>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.expectedApproach}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* HR */}

            <section className="mb-14">

              <div className="mb-6">

                <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  03 / Behavioral
                </p>

                <h2 className="text-2xl font-bold text-white">
                  HR & Behavioral Questions
                </h2>

              </div>


              <div className="space-y-4">

                {interviewPrep.hr?.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-7"
                  >

                    <div className="flex gap-5">

                      <span className="text-indigo-500 font-black text-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>

                        <h3 className="text-lg font-semibold text-white mb-4">
                          {item.question}
                        </h3>

                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">
                          Why Interviewers Ask This
                        </p>

                        <p className="text-slate-400 text-sm mb-4">
                          {item.whyAsked}
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {item.answerPoints?.map((point, i) => (

                            <span
                              key={i}
                              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 text-xs"
                            >
                              {point}
                            </span>

                          ))}

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* Communication */}

            <section className="mb-14">

              <div className="mb-6">

                <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  04 / Communication
                </p>

                <h2 className="text-2xl font-bold text-white">
                  Communication Practice
                </h2>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {interviewPrep.communication?.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-7"
                  >

                    <div className="flex justify-between items-start mb-5">

                      <span className="text-indigo-500 font-black text-xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold uppercase">
                        {item.timeLimit}
                      </span>

                    </div>

                    <h3 className="text-lg font-semibold text-white leading-relaxed mb-5">
                      {item.task}
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {item.focus?.map((focus, i) => (

                        <span
                          key={i}
                          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 text-xs"
                        >
                          {focus}
                        </span>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* Must Remember */}

            <section className="mb-14">

              <div className="mb-6">

                <p className="text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
                  05 / Revision
                </p>

                <h2 className="text-2xl font-bold text-white">
                  Must Remember
                </h2>

              </div>


              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {interviewPrep.mustRemember?.map((point, index) => (

                    <div
                      key={index}
                      className="flex gap-4 p-5 bg-slate-950 border border-slate-800 rounded-xl"
                    >

                      <span className="text-indigo-500 font-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {point}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </section>


            {/* Generate Again */}

            <div className="flex justify-center pb-10">

              <button
                onClick={handleGenerate}
                className="px-8 py-4 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500/50 font-bold rounded-xl transition-all text-sm"
              >
                Generate Again
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default InterviewPrep;