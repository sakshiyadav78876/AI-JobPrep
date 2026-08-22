
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// import "../../styles/dashboard.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
  
//   // State for User and Form
//   const [user, setUser] = useState(null);
//   const [file, setFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
  
//   // State for UI Logic
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   // Load user on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!storedUser || !token) {
//       navigate("/login");
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//       setError("");
//     } else {
//       setError("Please upload a valid PDF file.");
//       setFile(null);
//     }
//   };

//   const handleAnalyze = async (e) => {
//     e.preventDefault();
//     if (!file || !jobDescription) {
//       setError("Please provide both a resume and a job description.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     const formData = new FormData();
//     formData.append("resume", file);
//     formData.append("jobDescription", jobDescription);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await API.post("/resume/analyze-upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         setResult(response.data.resume.analysis);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Analysis failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans">
//       {/* NAVBAR */}
//       <nav className="border-b border-slate-800 bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
//                 <span className="text-white font-bold text-xl">A</span>
//               </div>
//               <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
//                 AI JobPrep
//               </span>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <div className="hidden sm:flex flex-col items-end">
//                 <span className="text-sm font-medium text-white">{user.name}</span>
//                 <span className="text-[10px] text-slate-500 uppercase tracking-wider">Pro Member</span>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-semibold uppercase">
//                 {user.name.charAt(0)}
//               </div>
//               <button 
//                 onClick={handleLogout}
//                 className="ml-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-5xl mx-auto px-4 py-12">
//         {/* WELCOME SECTION */}
//         <header className="mb-12">
//           <h1 className="text-4xl font-extrabold text-white mb-2">
//             Welcome back, {user.name} 
//           </h1>
//           <p className="text-slate-400 text-lg">
//             Analyze your resume and improve your job readiness with AI.
//           </p>
//         </header>

//         {/* INPUT SECTION */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* RESUME UPLOAD */}
//           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
//                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
//               </div>
//               <h2 className="text-lg font-semibold text-white">Resume Upload</h2>
//             </div>
            
//             <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-xl cursor-pointer transition-all">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg className="w-8 h-8 mb-3 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
//                 <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                 <p className="text-xs text-slate-500">PDF Only (MAX. 5MB)</p>
//               </div>
//               <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
//               {file && (
//                 <div className="absolute inset-0 bg-slate-900 rounded-xl flex items-center justify-center border border-indigo-500">
//                   <span className="text-indigo-400 font-medium px-4 truncate">{file.name}</span>
//                   <button onClick={(e) => {e.preventDefault(); setFile(null);}} className="ml-2 text-slate-400 hover:text-red-400">✕</button>
//                 </div>
//               )}
//             </label>
//           </div>

//           {/* JOB DESCRIPTION */}
//           <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
//                 <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
//               </div>
//               <h2 className="text-lg font-semibold text-white">Job Description</h2>
//             </div>
//             <textarea
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               placeholder="Paste the job description here to see how well you match..."
//               className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
//             />
//           </div>
//         </div>

//         {/* ERROR MESSAGE */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
//             <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//             {error}
//           </div>
//         )}

//         {/* ANALYZE BUTTON */}
//         <div className="flex justify-center mb-16">
//           <button
//             onClick={handleAnalyze}
//             disabled={loading || !file || !jobDescription}
//             className={`
//               relative px-12 py-4 rounded-full font-bold text-lg transition-all duration-300
//               ${loading 
//                 ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
//                 : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 active:scale-95"
//               }
//             `}
//           >
//             {loading ? (
//               <div className="flex items-center gap-3">
//                 <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                 Analyzing Resume...
//               </div>
//             ) : "Analyze Now"}
//           </button>
//         </div>

//         {/* RESULTS SECTION */}
//         {result && (
//           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               {/* ATS SCORE CARD */}
//               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
//                 <div className="relative mb-4">
//                     <svg className="w-32 h-32 transform -rotate-90">
//                         <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
//                         <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
//                             strokeDasharray={364.4} 
//                             strokeDashoffset={364.4 - (364.4 * result.atsScore) / 100}
//                             strokeLinecap="round"
//                             className="text-indigo-500 transition-all duration-1000 ease-out" />
//                     </svg>
//                     <div className="absolute inset-0 flex flex-col items-center justify-center">
//                         <span className="text-3xl font-bold text-white">{result.atsScore}%</span>
//                     </div>
//                 </div>
//                 <p className="text-slate-400 font-medium">Resume Match Score</p>
//               </div>

//               {/* MATCHED SKILLS */}
//               <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
//                 <h3 className="text-emerald-400 font-semibold mb-4 flex items-center gap-2">
//                   <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
//                   Matched Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {result.matchedSkills.map((skill, index) => (
//                     <span key={index} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* MISSING SKILLS */}
//               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
//                 <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
//                   <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
//                   Missing Skills
//                 </h3>
//                 <div className="space-y-3">
//                   {result.missingSkills.map((skill, index) => (
//                     <div key={index} className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-200/80 text-sm flex items-center justify-between">
//                       {skill}
//                       <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Required</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* AI SUGGESTIONS */}
//               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
//                 <h3 className="text-indigo-400 font-semibold mb-4 flex items-center gap-2">
//                   <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
//                   AI Suggestions
//                 </h3>
//                 <div className="space-y-4">
//                   {result.suggestions.map((suggestion, index) => (
//                     <div key={index} className="flex gap-3">
//                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
//                       <p className="text-slate-400 text-sm leading-relaxed">{suggestion}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



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