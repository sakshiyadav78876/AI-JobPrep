
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import "../../styles/dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();

  // --- Core States (Unchanged Backend Logic) ---
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // --- Auth Logic (Unchanged) ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  // --- API Call (Unchanged Logic) ---
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      setError("Resume and Job Description are required.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/resume/analyze-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setResult(res.data.resume.analysis);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-root bg-[#030014] min-h-screen text-slate-200 font-sans">
       
       <nav className="dashboard-nav">

    <div className="logo">
      AI JobPrep
    </div>


    <div className="nav-links">

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink to="/resume-analyzer">
        Resume Analyzer
      </NavLink>

      <NavLink to="/interview-prep">
        Interview Prep
      </NavLink>

    </div>

<button 
 onClick={handleLogout}
 className="logout-btn"
>
 Logout
</button>


  </nav>
  

  <main className="max-w-6xl mx-auto px-6 pt-12 pb-12">
        
        {/* INPUT SECTION (Shown only when not loading and no result) */}
        {!loading && !result && (
          <div className="animate-fade-in">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
              <p className="text-slate-400 text-lg">Analyze your resume and improve your job readiness with AI.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-6">Resume Upload</h2>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800/30 transition-all">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-600 mt-2 uppercase font-bold">PDF Only</p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </label>
                {file && <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm truncate">{file.name}</div>}
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-6">Job Description</h2>
                <textarea 
                  className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 outline-none focus:border-indigo-500 transition-all resize-none"
                  placeholder="Paste the target job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              {error && <p className="text-red-400 mb-4 text-sm font-medium">{error}</p>}
              <button 
                onClick={handleAnalyze} 
                disabled={!file || !jobDescription}
                className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-500/20"
              >
                Analyze Resume
              </button>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-10"></div>
            <h2 className="text-[26px] font-semibold text-white mb-8">Analyzing your resume and matching career opportunities...</h2>
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
              {["Resume Understanding", "Skill Extraction", "Job Requirement Matching", "Career Recommendation Generation"].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYSIS RESULTS */}
        {result && !loading && (
          <div className="animate-slide-up">
            <header className="mb-12 border-b border-slate-800 pb-10">
              <h1 className="text-[40px] font-bold text-white leading-tight mb-3">Resume Intelligence Analysis Complete</h1>
              <p className="text-slate-400 text-lg">Detailed compatibility report based on your profile and the target job description.</p>
            </header>

            {/* DASHBOARD OVERVIEW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center">
                <h3 className="text-slate-500 uppercase text-xs font-black tracking-[0.2em] mb-8">Career Match Score</h3>
                <div className="relative">
                  <svg className="w-44 h-44 transform -rotate-90">
                    <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                    <circle cx="88" cy="88" r="80" stroke="currentColor" strokeWidth="10" fill="transparent" 
                      strokeDasharray={502} strokeDashoffset={502 - (502 * result.atsScore) / 100}
                      className="text-indigo-500 transition-all duration-1000" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[44px] font-black text-white">{result.atsScore}%</span>
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-10">
                <h3 className="text-[26px] font-bold text-white mb-8">Skill Compatibility Overview</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Technical Alignment</span>
                      <span className="text-white font-bold">{result.atsScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${result.atsScore}%` }}></div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Your professional profile demonstrates a {result.atsScore >= 75 ? 'strong' : 'moderate'} correlation with the core requirements of this role. 
                    Addressing the identified skill gaps will maximize your hiring probability.
                  </p>
                </div>
              </div>
            </div>

            {/* SKILL MATCH CARDS */}
            <h2 className="text-[26px] font-bold text-white mb-8">Skill Match Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {result.matchedSkills.map((skill, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[22px] font-bold text-white">{skill}</h4>
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded tracking-widest border border-emerald-500/20">Strong Match</span>
                  </div>
                  <div className="text-slate-500 text-[11px] font-bold uppercase mb-3 tracking-widest">Importance: Essential</div>
                  <p className="text-slate-400 text-base leading-relaxed">Your experience aligns with the primary frontend development requirements for this role.</p>
                </div>
              ))}

              {result.missingSkills.map((skill, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-[22px] font-bold text-white">{skill}</h4>
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-amber-500/10 text-amber-400 rounded tracking-widest border border-amber-500/20">Skill Gap</span>
                  </div>
                  <div className="text-slate-500 text-[11px] font-bold uppercase mb-3 tracking-widest">Importance: Critical</div>
                  <p className="text-slate-400 text-base leading-relaxed">Acquiring proficiency in this domain is necessary for meeting the full job specifications.</p>
                </div>
              ))}
            </div>

            {/* LEARNING ROADMAP */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10 mb-16">
              <h2 className="text-[26px] font-bold text-white mb-10">AI Career Intelligence Roadmap</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex flex-col p-6 bg-slate-950 border border-slate-800 rounded-2xl">
                    <span className="text-indigo-500 font-black text-2xl mb-4">0{index + 1}</span>
                    <p className="text-slate-300 text-base leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-center pb-20">
              <button 
                onClick={() => setResult(null)} 
                className="px-10 py-4 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 font-bold rounded-xl transition-all uppercase tracking-widest text-xs"
              >
                Conduct New Analysis
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
