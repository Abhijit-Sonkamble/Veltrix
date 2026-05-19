import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { ForgotPassword } from "../../services/auth/authService";
import {
  Mail,
  ArrowRight,
  Shield,
  Sparkles,
  KeyRound,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const onFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoader(true);

      const data = await ForgotPassword(email);

      if (data.status === 200) {
        toast.info(
          "If an account exists, an OTP has been sent."
        );

        sessionStorage.setItem("email", email);

        navigate("/otp-verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-[#0A0F1E] via-[#0F1629] to-[#0A0F1E]" />

        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-150 h-150 bg-blue-500/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2"></div>

      </div>

      {/* Main Card */}

      <div className="relative w-full max-w-5xl bg-white/3 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">

        <div className="flex flex-col lg:flex-row">

          {/* Left */}

          <div className="lg:w-1/2 bg-linear-to-br from-[#0F1629] via-[#0A0F1E] to-[#0F1629] p-10 flex flex-col justify-between relative">

            <div>

              <div className="flex items-center gap-2 mb-12">

                <KeyRound className="w-8 h-8 text-amber-400" />

                <span className="text-2xl font-bold text-white">
                  SecureReset
                </span>

                <Sparkles className="w-4 h-4 text-amber-300" />

              </div>

              <div className="space-y-6">

                <div className="inline-flex gap-2 items-center px-3 py-1 bg-white/5 rounded-full border border-white/10">

                  <Shield className="w-4 h-4 text-amber-400" />

                  <span className="text-xs text-amber-400">
                    PASSWORD SECURITY
                  </span>

                </div>

                <h1 className="text-5xl font-bold text-white leading-tight">

                  Forgot your
                  <span className="block bg-linear-to-r from-amber-400 to-white bg-clip-text text-transparent">
                    password?
                  </span>

                </h1>

                <p className="text-gray-400 leading-relaxed">

                  Enter your registered email and we’ll
                  send a secure OTP for account recovery.

                </p>

              </div>

            </div>

            <div className="mt-10 border-t border-white/10 pt-6">

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">

                  <Shield className="w-5 h-5 text-amber-400" />

                </div>

                <div>

                  <p className="text-white text-sm">
                    Fully Encrypted
                  </p>

                  <p className="text-gray-500 text-xs">
                    Protected verification flow
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="lg:w-1/2 p-10 flex items-center">

            <div className="w-full max-w-md mx-auto">

              <div className="mb-8">

                <h2 className="text-white text-3xl font-bold">
                  Reset Access
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  Enter email to receive OTP
                </p>

              </div>

              <form
                onSubmit={onFormSubmit}
                className="space-y-6"
              >

                <div>

                  <label className="text-gray-300 text-sm block mb-2">

                    Email Address

                  </label>

                  <div className="relative group">

                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-amber-400 transition" />

                    <input
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      type="email"
                      placeholder="hello@example.com"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loader}
                  className={`w-full rounded-xl py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2

                  ${
                    loader
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-linear-to-r from-amber-500 to-amber-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30"
                  }
                  `}
                >

                  {loader ? (
                    <div className="flex items-center gap-3">

                      <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>

                      <span className="text-white">
                        Sending OTP...
                      </span>

                    </div>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                    </>
                  )}

                </button>

              </form>

              <div className="text-center mt-8">

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

      <div className="absolute bottom-6 text-center w-full">

        <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">

          Secure Authentication System

        </p>

      </div>

    </div>
  );
}