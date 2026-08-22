// Landing.jsx
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Menu,
  X,
  ChevronRight,
  FileText,
  Video,
  Map,
  Code,
  CheckCircle2,
  Play,
  Star,
  BarChart3,
  Search,
  ArrowRight
} from 'lucide-react';

// --- Sub-components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'AI Interview', href: '#' },
    { name: 'Resume Analyzer', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AI JobPrep</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
  <Link 
  to="/login"
  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
>
  Login
</Link>
          <Link to="/register">
  <button className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
    Get Started
  </button>
</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 p-4 space-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block text-zinc-400 py-2">{link.name}</a>
          ))}
          <Link 
  to="/login"
  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
>
  Login
</Link>
          <Link to="/register">
  <button className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
    Get Started
  </button>
</Link>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Now trusted by 50,000+ students
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 premium-gradient-text">
              Crack Your Dream Job With AI-Powered Preparation
            </h1>
            <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Analyze your resume, identify skill gaps, practice AI interviews, and prepare with personalized roadmaps. Your journey to Big Tech starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
<Link to="/register">
  <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2">
    Start Preparation
    <ChevronRight className="w-5 h-5" />
  </button>
</Link>
              <button className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all">
                <Play className="w-4 h-4 fill-current" /> Watch Demo
              </button>
            </div>
          </div>

          {/* Hero UI Mockup */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20"></div>
            <div className="relative glass-card rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="dashboard-dot bg-red-500/50"></div>
                  <div className="dashboard-dot bg-yellow-500/50"></div>
                  <div className="dashboard-dot bg-green-500/50"></div>
                </div>
                <div className="px-3 py-1 bg-zinc-800 rounded text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Candidate_Report_v2</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">ATS Resume Score</span>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-3xl font-bold text-indigo-400">84</span>
                    <span className="text-zinc-600 text-sm mb-1">/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 mt-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[84%]"></div>
                  </div>
                </div>
                <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Placement Readiness</span>
                  <div className="flex items-end gap-2 mt-1 text-green-400">
                    <span className="text-3xl font-bold">High</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 5 ? 'bg-green-500' : 'bg-zinc-800'}`}></div>)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">AI Interview Feedback</span>
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Analysis Complete</span>
                  </div>
                  <p className="text-xs text-zinc-400 italic">"Strong explanation of CAP Theorem. Consider improving the bridge between consistency and latency."</p>
                </div>
                
                <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Recommended Practice</span>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs p-2 bg-zinc-900 rounded border border-zinc-800/50">
                      <span className="text-zinc-300">LRU Cache Design</span>
                      <span className="text-indigo-400 font-semibold">Medium</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 bg-zinc-900 rounded border border-zinc-800/50">
                      <span className="text-zinc-300">Scalability Patterns</span>
                      <span className="text-amber-400 font-semibold">Hard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Trust = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 pt-10">
    <p className="text-center text-zinc-500 text-sm font-medium mb-8">Trusted by students preparing for top tech companies</p>
    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
      {['Google', 'Microsoft', 'Amazon', 'Meta', 'Adobe'].map(company => (
        <span key={company} className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-300 uppercase">{company}</span>
      ))}
    </div>
  </div>
);

const Features = () => {
  const items = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI Resume Analyzer",
      desc: "Upload your resume and get an instant ATS score with actionable keyword and format suggestions."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "AI Mock Interviews",
      desc: "Practice realistic technical and HR rounds with an AI that mimics top-tier company interviewers."
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Personalized Roadmap",
      desc: "Based on your dream role, we detect your weaknesses and create a daily structured learning plan."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Coding Interview Practice",
      desc: "Master DSA with curated questions, real-time code analysis, and complexity tracking."
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Precision-Engineered Preparation</h2>
          <p className="text-zinc-400">Tools designed to help you stand out from thousands of applicants.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl group hover:border-indigo-500/50 transition-all cursor-default">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Upload Resume", desc: "Our AI scans your experience and skills." },
    { title: "AI Analysis", desc: "Identify gaps compared to top job descriptions." },
    { title: "Practice Interview", desc: "Simulate real interview pressure with AI." },
    { title: "Become Job Ready", desc: "Improve iteratively until you're placement ready." }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">The Path to Hiring</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold mx-auto mb-6 text-lg relative z-10">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-full h-[2px] bg-zinc-800 z-0"></div>
              )}
              <h4 className="text-lg font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-3xl p-4 md:p-8 flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-zinc-800 pb-4 lg:pb-0 lg:pr-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            <div>
              <div className="text-sm font-bold">Alex Rivera</div>
              <div className="text-[10px] text-zinc-500">Frontend Engineer</div>
            </div>
          </div>
          <div className="space-y-1">
            {['Overview', 'Resume Analyzer', 'Mock Interviews', 'Roadmaps', 'Progress'].map((item, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-lg ${i === 0 ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-500'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="text-indigo-500 w-5 h-5" />
                <span className="text-xs text-green-500">+12% vs last week</span>
              </div>
              <div className="text-2xl font-bold">78%</div>
              <div className="text-xs text-zinc-500 mt-1">Readiness Score</div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle2 className="text-indigo-500 w-5 h-5" />
                <span className="text-xs text-indigo-500">3 left today</span>
              </div>
              <div className="text-2xl font-bold">14 / 20</div>
              <div className="text-xs text-zinc-500 mt-1">Questions Completed</div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <Star className="text-yellow-500 w-5 h-5" />
                <span className="text-xs text-zinc-500">Tier 1 Elite</span>
              </div>
              <div className="text-2xl font-bold">Gold</div>
              <div className="text-xs text-zinc-500 mt-1">Global Ranking</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
              <h5 className="font-bold mb-4 text-sm">AI Weekly Progress</h5>
              <div className="flex items-end gap-2 h-40">
                {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm relative group">
                    <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono">
                <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
              </div>
            </div>
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
              <h5 className="font-bold mb-4 text-sm">Targeted Recommendations</h5>
              <div className="space-y-3">
                {[
                  { label: 'System Design', value: 'Load Balancers', time: '15 mins' },
                  { label: 'Behavioral', value: 'Conflict Management', time: '10 mins' },
                  { label: 'Data Structures', value: 'B-Trees & Indexing', time: '45 mins' }
                ].map((rec, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                    <div>
                      <div className="text-[10px] text-indigo-500 font-bold uppercase">{rec.label}</div>
                      <div className="text-xs text-zinc-300">{rec.value}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);



const CTA = () => (
  <section className="py-24">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to become interview ready?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-90">
            Join the community of ambitious developers using AI to gain a massive competitive edge.
          </p>
          <button className="bg-white text-indigo-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all shadow-xl">
            Start Your AI Preparation
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-bold">AI JobPrep</span>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Empowering the next generation of engineers with high-precision AI preparation tools.
          </p>
        </div>
        <div>
          <h6 className="font-bold mb-6">Product</h6>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li className="hover:text-indigo-400 cursor-pointer">Resume Analyzer</li>
            <li className="hover:text-indigo-400 cursor-pointer">Mock Interviews</li>
            <li className="hover:text-indigo-400 cursor-pointer">Roadmaps</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold mb-6">Company</h6>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li className="hover:text-indigo-400 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-indigo-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold mb-6">Social</h6>
          <div className="flex gap-4">
<span className="text-zinc-500 hover:text-white cursor-pointer">
  GitHub
</span>

<span className="text-zinc-500 hover:text-white cursor-pointer">
  Twitter
</span>

<span className="text-zinc-500 hover:text-white cursor-pointer">
  LinkedIn
</span>
          </div>
        </div>
      </div>
      <div className="text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
        © 2024 AI JobPrep Inc. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Main Assembly ---

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <DashboardPreview />
       
        <CTA />
      </main>
      <Footer />
    </div>
  );
}