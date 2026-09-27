import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import "../../styles/dashboard.css";


const AICoach = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);


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


  const askQuestion = async (selectedQuestion = question) => {

    const text = selectedQuestion.trim();

    if (!text || loading) {
      return;
    }


    const userMessage = {
      role: "user",
      content: text
    };


    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setQuestion("");
    setLoading(true);


    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/coach/chat",
        {
          question: text
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const aiMessage = {
        role: "ai",
        content: res.data.answer
      };


      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

    } catch (error) {

      console.log(
        "AI COACH ERROR:",
        error
      );


      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Sorry, something went wrong. Please try again."
        }
      ]);

    } finally {

      setLoading(false);

    }

  };


  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      askQuestion();

    }

  };


  const starterQuestions = [
    "Explain polymorphism in Java",
    "Give me SQL interview questions",
    "How should I prepare for a technical interview?",
    "Explain binary search simply"
  ];


  return (

    <div className="dashboard-root bg-[#030014] min-h-screen text-slate-200 font-sans">


      {/* NAVBAR */}

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


      {/* MAIN */}

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-12">


        {/* HERO */}

        <section className="mb-10">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">

              <span className="text-xl">
                ✦
              </span>

            </div>


            <span className="text-indigo-400 text-sm font-semibold tracking-wide">
              AI PLACEMENT COACH
            </span>

          </div>


          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">

            Ask Anything.
            <span className="text-indigo-500">
              {" "}Prepare Better.
            </span>

          </h1>


          <p className="text-slate-400 max-w-2xl text-lg">

            Your personal AI coach for placement preparation.
            Ask questions, learn concepts, practice coding,
            or get interview guidance.

          </p>

        </section>



        {/* COACH CARD */}

        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">


          {/* CARD HEADER */}

          <div className="px-6 md:px-8 py-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">


            <div>

              <h2 className="text-xl font-semibold text-white">
                AI Coach
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Ask anything about your placement preparation.
              </p>

            </div>


            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-green-500"></div>

              <span className="text-sm text-slate-400">
                AI Online
              </span>

            </div>

          </div>



          {/* CHAT AREA */}

          <div className="min-h-[420px] max-h-[520px] overflow-y-auto p-6 md:p-8">


            {/* EMPTY STATE */}

            {messages.length === 0 && (

              <div className="flex flex-col items-center justify-center min-h-[350px] text-center">


                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-5">

                  <span className="text-3xl">
                    ✦
                  </span>

                </div>


                <h3 className="text-xl font-semibold text-white mb-2">

                  Hi{user?.name ? `, ${user.name}` : ""}! 

                </h3>


                <p className="text-slate-400 max-w-md mb-7">

                  I'm your AI placement coach.
                  Ask me anything and let's prepare together.

                </p>


                {/* STARTER QUESTIONS */}

                <div className="flex flex-wrap justify-center gap-3 max-w-3xl">

                  {starterQuestions.map((item, index) => (

                    <button
                      key={index}
                      onClick={() => askQuestion(item)}
                      className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 hover:border-indigo-500/50 hover:text-indigo-400 transition"
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>

            )}



            {/* MESSAGES */}

            {messages.length > 0 && (

              <div className="space-y-6">

                {messages.map((message, index) => (

                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-md"
                          : "bg-slate-950 border border-slate-800 text-slate-300 rounded-bl-md"
                      }`}
                    >

                      <div className="text-xs mb-2 opacity-60">

                        {message.role === "user"
                          ? "You"
                          : "AI Coach"}

                      </div>


                      <div className="whitespace-pre-wrap leading-7 text-sm md:text-base">

                        {message.content}

                      </div>

                    </div>

                  </div>

                ))}



                {/* LOADING */}

                {loading && (

                  <div className="flex justify-start">

                    <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-bl-md px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>

                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:150ms]"></div>

                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:300ms]"></div>

                        <span className="text-sm text-slate-500 ml-2">
                          AI is thinking...
                        </span>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>



          {/* INPUT AREA */}

          <div className="border-t border-slate-800 p-5 md:p-6">


            <div className="flex items-end gap-3">


              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl focus-within:border-indigo-500/50 transition">


                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your placement preparation..."
                  rows="2"
                  className="w-full resize-none bg-transparent px-5 py-4 outline-none text-slate-200 placeholder:text-slate-600 text-sm md:text-base"
                />

              </div>


              <button
                onClick={() => askQuestion()}
                disabled={!question.trim() || loading}
                className="h-[56px] px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition shadow-lg shadow-indigo-600/20"
              >

                {loading ? "..." : "Send"}

              </button>

            </div>


            <p className="text-xs text-slate-600 mt-3 ml-1">
              Press Enter to send • Shift + Enter for a new line
            </p>

          </div>

        </section>


      </main>

    </div>

  );

};


export default AICoach;