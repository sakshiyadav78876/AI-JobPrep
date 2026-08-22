import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Cpu, 
  FileSearch, 
  Target, 
  Zap, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 selection:bg-purple-500/30">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#030014]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">AI JobPrep</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How It Works</a>
            <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Dashboard</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white px-4">Login</Link>
            <Link to="/login" className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-slate-200 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Personalized AI Career Guidance</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Your AI Career Assistant to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Get Job Ready</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
              Analyze your resume, discover suitable job roles, identify skill gaps, and prepare for interviews with personalized AI guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all">
                Start Analysis <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Explore Dashboard
              </Link>
            </div>
          </div>

          {/* AI PRODUCT PREVIEW */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">AI Resume Analysis</h4>
                    <p className="text-xs text-slate-500">Candidate Report #2041</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-400">87%</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">ATS Score</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Recommended Role</span>
                  <div className="text-white font-bold text-lg">Frontend Developer</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">Strong Skills</span>
                    <div className="flex flex-col gap-2">
                      {['React.js', 'JavaScript', 'Node.js'].map(s => (
                        <div key={s} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">Areas to Improve</span>
                    <div className="flex flex-col gap-2">
                      {['TypeScript', 'AWS'].map(s => (
                        <div key={s} className="flex items-center gap-2 text-xs text-slate-300">
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything you need to prepare smarter</h2>
            <p className="text-slate-400">Advanced AI tools built to bridge the gap between learning and hiring.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FileSearch className="w-6 h-6 text-purple-400" />}
              title="Resume Analyzer"
              desc="Instant ATS scoring, skill matching, and tailored suggestions to beat the bots."
            />
            <FeatureCard 
              icon={<Target className="w-6 h-6 text-cyan-400" />}
              title="Career Matching"
              desc="AI analyzes your profile to suggest high-probability job roles and directions."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-amber-400" />}
              title="Skill Roadmaps"
              desc="Personalized learning paths focusing on missing technologies for your goal role."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-indigo-400" />}
              title="Interview Prep"
              desc="Practice technical, coding, and HR questions with real-time AI feedback."
            />
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-20">Your Path to Excellence</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <Step number="1" title="Upload Resume" desc="Our AI parses your experience and skills instantly." />
            <Step number="2" title="Identify Gaps" desc="Compare your profile with specific job descriptions." />
            <Step number="3" title="Bridge Skills" desc="Follow AI-generated learning paths to get ready." />
            <Step number="4" title="Ace Interviews" desc="Practice until you're confident for the real thing." />
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE SECTION */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8 leading-tight">Why Choose AI JobPrep?</h2>
              <div className="space-y-4">
                {[
                  "AI-Powered Resume Analysis",
                  "Smart Career Recommendations",
                  "Personalized Learning Path",
                  "Interview Preparation Simulator",
                  "Skill Gap Detection Engine"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-slate-300 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-10 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">"Ready to build your career with AI?"</h3>
              <p className="text-slate-400 mb-8">Join thousands of job seekers preparing the modern way.</p>
              <Link to="/login" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all scale-110">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">AI JobPrep</span>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-500">
            <Link to="/login" className="hover:text-white">Features</Link>
            <Link to="/login" className="hover:text-white">How It Works</Link>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
          </div>
          
          <div className="text-sm text-slate-600">
            © 2024 AI JobPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-Components ---

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-2xl hover:border-purple-500/50 transition-all group">
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="text-center relative">
    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 relative z-10">
      {number}
    </div>
    <h4 className="text-white font-bold mb-2">{title}</h4>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);

export default Landing;