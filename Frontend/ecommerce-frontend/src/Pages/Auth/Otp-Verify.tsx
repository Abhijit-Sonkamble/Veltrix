import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { ForgotPassword, OTPVerify } from "../../services/auth/authService";
import {
  Shield,
  Sparkles,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export default function OTPVerifyPage() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [myTimer, setMyTimer] = useState<number>(120);
  const [loader, setLoader] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // timer logic same
  useEffect(() => {
    if (myTimer <= 0) return;

    let time = setInterval(() => {
      setMyTimer((s) => s - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [myTimer]);

  const minute = Math.floor(myTimer / 60)
    .toString()
    .padStart(2, "0");

  const second = (myTimer % 60)
    .toString()
    .padStart(2, "0");

  // same logic
  const handleChange = (
    element: HTMLInputElement,
    index: number
  ) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([
      ...otp.map((d, idx) =>
        idx === index ? element.value : d
      ),
    ]);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onFormSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length < 6)
      return toast.error(
        "Please enter full 6-digit OTP"
      );

    setLoader(true);

    const data = await OTPVerify(finalOtp);

    if (data.status === 200) {
      toast.success(
        "OTP Verified Successfully"
      );

      navigate("/new-password");
    } else {
      toast.error(
        data.message || "Invalid OTP"
      );
    }

    setLoader(false);
  };

  const resetOTP = async () => {
    const email =
      sessionStorage.getItem("email") || "";

    const dataOTP =
      await ForgotPassword(email);

    if (dataOTP.status === 200) {
      toast.success(dataOTP.message);

      setMyTimer(120);
    } else {
      toast.error(dataOTP.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4 relative overflow-hidden">

      {/* background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-[#0A0F1E] via-[#0F1629] to-[#0A0F1E]" />

        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-162.5 h-162.5 bg-blue-500/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>

      </div>

      {/* card */}

      <div className="relative w-full max-w-5xl bg-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,.7)]">

        <div className="flex flex-col lg:flex-row">

          {/* left side */}

          <div className="lg:w-1/2 bg-linear-to-br from-[#0F1629] via-[#0A0F1E] to-[#0F1629] p-10 flex flex-col justify-between">

            <div>

              <div className="flex items-center gap-2 mb-12">

                <KeyRound className="w-8 h-8 text-amber-400"/>

                <span className="text-2xl font-bold text-white">
                  OTP Verify
                </span>

                <Sparkles className="w-4 h-4 text-amber-400"/>

              </div>

              <div className="space-y-6">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">

                  <Shield className="w-4 h-4 text-amber-400"/>

                  <span className="text-xs text-amber-400">
                    SECURE VALIDATION
                  </span>

                </div>

                <h1 className="text-5xl font-bold text-white leading-tight">

                  Verify your
                  <span className="block bg-linear-to-r from-amber-400 to-white bg-clip-text text-transparent">
                    identity
                  </span>

                </h1>

                <p className="text-gray-400 leading-relaxed">

                  We sent a secure 6-digit verification
                  code to your email address.

                </p>

              </div>

            </div>

            <div className="border-t border-white/10 pt-6 mt-10">

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">

                  <Shield className="w-5 h-5 text-amber-400"/>

                </div>

                <div>

                  <p className="text-white text-sm">
                    Protected Verification
                  </p>

                  <p className="text-gray-500 text-xs">
                    Fully encrypted security flow
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* right */}

          <div className="lg:w-1/2 p-10 flex items-center">

            <div className="w-full max-w-md mx-auto">

              <div className="mb-8">

                <h2 className="text-white text-3xl font-bold">
                  Enter OTP
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  Enter your 6 digit verification code
                </p>

              </div>

              <form
                className="space-y-8"
                onSubmit={onFormSubmit}
              >

                <div className="flex justify-between gap-3">

                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      value={data}
                      onChange={(e) =>
                        handleChange(
                          e.target,
                          index
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          index
                        )
                      }
                      className="w-14 h-16 rounded-xl bg-white/5 border border-white/10 text-center text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                  ))}

                </div>

                <button
                  type="submit"
                  disabled={loader}
                  className={`w-full rounded-xl py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2

                  ${
                    loader
                      ? "bg-gray-700"
                      : "bg-linear-to-r from-amber-500 to-amber-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30"
                  }
                  `}
                >

                  {loader ? (
                    <div className="flex items-center gap-3">

                      <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>

                      Verifying...

                    </div>
                  ) : (
                    <>
                      Verify OTP
                      <ArrowRight className="w-4 h-4"/>
                    </>
                  )}

                </button>

              </form>

              <div className="mt-8 text-center space-y-4">

                <p className="text-gray-500">

                  Didn't receive OTP?{" "}

                  <button
                    onClick={resetOTP}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    {minute === "00" &&
                    second === "00"
                      ? "Resend OTP"
                      : `${minute}:${second}`}
                  </button>

                </p>

                <Link
                  to="/login"
                  className="text-gray-400 hover:text-amber-400 transition"
                >
                  ← Back to Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}