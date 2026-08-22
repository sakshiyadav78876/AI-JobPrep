// import { useState } from "react";
// import API from "../api/axios";


// function Register(){

//     const [formData,setFormData] = useState({

//         name:"",
//         email:"",
//         password:""

//     });


//     const handleChange=(e)=>{

//         setFormData({

//             ...formData,
//             [e.target.name]:e.target.value

//         });

//     };


//     const handleSubmit=async(e)=>{

//         e.preventDefault();


//         try{

//             const res = await API.post(
//                 "/auth/register",
//                 formData
//             );


//             console.log(res.data);

//             alert("Registration Successful");


//         }
//         catch(error){

//             console.log(error.response?.data);

//             alert("Registration Failed");

//         }

//     };



//     return(

//         <div>

//             <h1>
//                 Create Account
//             </h1>


//             <form onSubmit={handleSubmit}>


//                 <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 onChange={handleChange}
//                 />


//                 <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 />


//                 <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 />


//                 <button>
//                     Register
//                 </button>


//             </form>


//         </div>

//     );

// }


// export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Cpu, 
  Loader2, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import API from "../api/axios";
import "../../styles/register.css";

function Register() {
  const navigate = useNavigate();
  
  // State management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (status.error) setStatus({ ...status, error: "" });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      return setStatus({ ...status, error: "Passwords do not match" });
    }

    if (formData.password.length < 6) {
      return setStatus({ ...status, error: "Password must be at least 6 characters" });
    }

    setStatus({ ...status, loading: true, error: "" });

    try {
      // 2. API Request (Matches your backend payload)
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setStatus({ loading: false, error: "", success: true });

      // 3. Navigate after a brief success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      // 4. Handle Backend Errors
      setStatus({
        loading: false,
        error: error.response?.data?.message || "Registration failed. Please try again.",
        success: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-2 rounded-xl mb-4 shadow-lg shadow-indigo-600/20">
            <Cpu className="text-white w-8 h-8" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create your account
          </h1>
          <p className="text-zinc-500 mt-2 text-center">
            Start your journey towards your dream job
          </p>
        </div>

        {/* Registration Card */}
        <div className="register-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Message */}
            {status.error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle size={18} />
                {status.error}
              </div>
            )}

            {/* Success Message */}
            {status.success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                <CheckCircle2 size={18} />
                Registration successful! Redirecting...
              </div>
            )}

            {/* Full Name */}
            <div className="input-group">
              <label className="text-sm font-medium text-zinc-400 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <User className="input-icon" size={20} />
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Mail className="input-icon" size={20} />
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Lock className="input-icon !top-1/2 !-translate-y-1/2" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label className="text-sm font-medium text-zinc-400 ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Lock className="input-icon !top-1/2 !-translate-y-1/2" size={20} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading || status.success}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 mt-2"
            >
              {status.loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-zinc-500 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Login
            </Link>
          </p>
        </div>

        {/* Security Trust Link */}
        <p className="text-[11px] text-zinc-600 text-center mt-8 uppercase tracking-widest">
          Secure • Encrypted • AI Powered
        </p>
      </div>
    </div>
  );
}

export default Register;