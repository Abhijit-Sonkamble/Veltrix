import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { OTPVerify } from "../../services/auth/authService";

export default function OTPVerifyPage() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [second, setSecond]= useState(59);
  const [minute, setMinute]= useState(1);
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  //For timeout
  useEffect(()=>{
  let mySecond = 59;

 let time =   setInterval(()=>{

      mySecond--;
      if (mySecond == 0) {
        setMinute(0);
        mySecond=59;

        return;
      }
      else{
        setSecond(mySecond)
      }
       if (minute === 0 && mySecond === 0) {
      clearInterval(time)
    }
    
    },100)


  }, [])

  // Handle Box Input Logic
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next box
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length < 6) return toast.error("Please enter full 6-digit OTP");

    setLoader(true);

        const data = await OTPVerify(finalOtp) //Ya madhe aapn otp he final otp madhe save hote tyamule aapn tithe bracket madhe final otp thevle

      if (data.status === 200) {
        toast.success("OTP Verified Successfully");
        navigate("/new-password");
      } else {
        toast.error(data.message || "Invalid OTP");
      }

    setLoader(false);
    
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[150px]"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center mb-6 shadow-[0_20px_40px_rgba(79,70,229,0.4)]">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-white text-3xl font-extrabold tracking-tight">Verify Identity 0{minute} : {second}</h2>
            <p className="text-indigo-200/50 text-center text-sm mt-3 leading-relaxed">
              We've sent a 6-digit code to your email. <br/> Enter it below to proceed.
            </p>
          </div>

          <form className="space-y-10" onSubmit={onFormSubmit}>
            {/* 6-Digit Input Group */}
            <div className="flex justify-between gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all"
                />
              ))}
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loader}
              className={`
                group relative overflow-hidden w-full font-bold py-4 rounded-2xl transition-all duration-500 active:scale-95
                flex items-center justify-center
                ${loader 
                  ? "bg-indigo-900 text-indigo-300" 
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                }
              `}
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                  <span className="tracking-widest uppercase text-xs">Verifying...</span>
                </div>
              ) : (
                <span className="uppercase tracking-widest text-xs font-bold">Verify & Proceed</span>
              )}
            </button>
          </form>

          {/* Resend Logic */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-indigo-200/40 text-sm">
              Didn't receive the code? {" "}
              <button className="text-indigo-400 hover:text-white transition-colors font-medium">Resend Code</button>
            </p>
            
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-indigo-300/60 hover:text-white transition-colors text-xs uppercase tracking-widest group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}