import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { ForgotPassword } from "../../services/auth/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoader(true);
    
    const data = await ForgotPassword(email)
    
    // Simulate API Call
  if (data.status === 200) {
    toast.info("If an account exists, an OTP has been sent.");
    navigate("/otp-verify")

    sessionStorage.setItem("email", email)

  } else {
    toast.error(data.message)
  }

      setLoader(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[150px]"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20">
          
          {/* Icon Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center mb-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-white text-3xl font-extrabold tracking-tight">Forgot Password?</h2>
            <p className="text-indigo-200/50 text-center text-sm mt-3 px-4 leading-relaxed">
              No worries! Enter your email and we'll send you an <span className="text-indigo-300 font-medium">OTP</span> to reset it.
            </p>
          </div>

          <form className="space-y-8" onSubmit={onFormSubmit}>
            {/* Input Group */}
            <div className="group space-y-2">
              <label className="text-indigo-200/80 text-xs uppercase tracking-widest font-semibold ml-1">
                Registered Email
              </label>
              <div className="relative">
                <input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all outline-none"
                />
                <div className="absolute inset-y-0 right-4 flex items-center opacity-20 group-focus-within:opacity-100 transition-opacity">
                   <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loader}
              className={`
                group relative overflow-hidden w-full font-bold py-4 rounded-2xl transition-all duration-500 active:scale-95
                flex items-center justify-center
                ${loader 
                  ? "bg-indigo-900 text-indigo-300" 
                  : "bg-white text-[#0a0e27] hover:bg-indigo-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                }
              `}
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-400/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-400 animate-spin"></div>
                  </div>
                  <span className="tracking-widest uppercase text-xs">Sending OTP...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2 uppercase tracking-widest text-xs">
                  Send Reset Link
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-10 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-indigo-300/60 hover:text-white transition-colors text-sm font-medium group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>

        {/* Brand Footer */}
        <p className="text-center text-white/10 text-[10px] mt-8 tracking-[0.4em] uppercase">
          Secure Authentication System
        </p>
      </div>
    </div>
  );
}