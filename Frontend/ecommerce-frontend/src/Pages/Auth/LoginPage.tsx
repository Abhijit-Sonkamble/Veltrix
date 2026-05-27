import { useState, type FormEvent } from "react";
import { loginAdmin } from "../../services/auth/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { allRoutes } from "../../routes/route";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoader(true);

      console.log("Login Data:", loginData);

      const data = await loginAdmin(loginData);

      if (data.status === 200) {
        toast.success(data.message);

        localStorage.setItem(
          "adminToken",
          data.result.token
        );

        navigate(allRoutes.dashboard);
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
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-linear-to-br from-[#0A0F1E] via-[#0F1629] to-[#0A0F1E]" />

        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-400/5 rounded-full blur-[150px]" />

      </div>

      {/* Main Card */}

      <div className="relative w-full max-w-6xl bg-white/2 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">

        <div className="flex flex-col lg:flex-row">

          {/* Left Side */}

          <div className="lg:w-1/2 bg-linear-to-br from-[#0F1629] via-[#0A0F1E] to-[#0F1629] p-10 flex flex-col justify-between">

            <div>

              <div className="flex items-center gap-2 mb-10">
                <ShoppingBag className="w-8 h-8 text-amber-400" />

                <span className="text-white text-2xl font-bold">
                  LuxeCart
                </span>

                <Sparkles className="text-amber-400 w-4 h-4" />
              </div>

              <div className="space-y-5">

                <div className="inline-flex gap-2 items-center px-3 py-1 rounded-full bg-white/5">

                  <Shield className="w-4 h-4 text-amber-400" />

                  <span className="text-xs text-amber-400">
                    SECURE ACCESS
                  </span>

                </div>

                <h1 className="text-white text-5xl font-bold leading-tight">
                  Welcome Back
                  <span className="block text-amber-400">
                    Premium Shopping
                  </span>
                </h1>

                <p className="text-gray-400">
                  Sign in to access exclusive deals and
                  premium features.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">

                  <Zap className="w-4 h-4 text-amber-400" />

                </div>

                <div>

                  <p className="text-white text-sm">
                    Express Delivery
                  </p>

                  <p className="text-gray-500 text-xs">
                    Free on $50+
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">

                  <Shield className="w-4 h-4 text-amber-400" />

                </div>

                <div>

                  <p className="text-white text-sm">
                    Secure Payment
                  </p>

                  <p className="text-gray-500 text-xs">
                    Protected
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="lg:w-1/2 p-10">

            <div className="max-w-md mx-auto">

              <div className="text-center mb-8">

                <h2 className="text-white text-3xl font-bold">
                  Sign In
                </h2>

                <p className="text-gray-400 text-sm">
                  Enter credentials
                </p>

              </div>

              <form
                className="space-y-6"
                onSubmit={onFormSubmit}
              >

                {/* Email */}

                <div>

                  <label className="text-gray-300 text-sm mb-2 block">
                    Email
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="hello@mail.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 py-3 text-white outline-none focus:border-amber-400"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label className="text-gray-300 text-sm mb-2 block">
                    Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password:
                            e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white outline-none focus:border-amber-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff />
                      ) : (
                        <Eye />
                      )}
                    </button>

                  </div>

                </div>

                {/* Extra */}

                <div className="flex justify-between text-sm">

                  <label className="text-gray-400">

                    <input
                      type="checkbox"
                      className="mr-2"
                    />

                    Remember me

                  </label>

                  <Link
                    to={allRoutes.forgotPassword}
                    className="text-amber-400"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* Button */}

                <button
                  disabled={loader}
                  type="submit"
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition
                  
                  ${
                    loader
                      ? "bg-gray-600"
                      : "bg-amber-500 hover:bg-amber-600"
                  }
                  
                  `}
                >

                  {loader ? (
                    "Loading..."
                  ) : (
                    <>
                      <LogIn />
                      Sign In
                      <ArrowRight />
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}