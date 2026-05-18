import { useState } from "react";
import { loginAdmin } from "../../services/auth/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFormSubmit = async (event: any) => {
    event.preventDefault();

    setLoader(true); //Loading

    console.log("Login Data : ", loginData);

    const data = await loginAdmin(loginData);

    if (data.status === 200) {
      //Dusrya page la send karayche
      toast.success(data.message);
      navigate("/dashboard");

      localStorage.setItem("adminToken", data.result.token); //local storage madhe token save karun thevayche jyane logout nahi honar
    } else {
      //Tyach page la thevayche
      toast.error(data.message);
      navigate("/login");
    }

    setLoader(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements to match the image */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500 rounded-full blur-[150px] opacity-10"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full border-2 border-indigo-400/50 p-1 mb-4 shadow-lg shadow-indigo-500/20">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Avatar"
                className="rounded-full bg-indigo-100"
              />
            </div>
            <h2 className="text-white text-2xl font-bold tracking-tight">
              LOGIN
            </h2>
            <p className="text-indigo-200/60 text-xs mt-1 uppercase tracking-widest">
              Welcome Back
            </p>
          </div>

          <form className="space-y-6" onSubmit={onFormSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-indigo-100 text-sm font-medium ml-1">
                Email Address
              </label>
              <input
                onChange={(e) => {
                  setloginData((prev) => ({ ...prev, email: e.target.value }));
                }}
                type="email"
                placeholder="username@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-indigo-100 text-sm font-medium ml-1">
                Password
              </label>
              <input
                onChange={(e) => {
                  setloginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-1 text-xs">
              <label className="flex items-center text-indigo-200/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 accent-indigo-500 rounded"
                />
                Remember me
              </label>
              <Link
                to={"/forgot-password"}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loader}
              className={`
    relative overflow-hidden w-full font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95
    flex items-center justify-center
    ${
      loader
        ? "bg-indigo-700 cursor-not-allowed"
        : "bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white shadow-lg shadow-indigo-900/40"
    }
  `}
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  {/* Sleek Ring Loader */}
                  <div className="relative">
                    <div className="h-5 w-5 rounded-full border-2 border-white/20"></div>
                    <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-t-2 border-white animate-spin"></div>
                  </div>

                  {/* Animated Text */}
                  <span className="tracking-wide animate-pulse">
                    Authenticating...
                  </span>

                  {/* Background Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Log in
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-indigo-200/50 text-sm mt-8">
            New here?{" "}
            <a href="#" className="text-white font-semibold hover:underline">
              Create Account
            </a>
          </p>
        </div>

        {/* Brand Footer */}
        <p className="text-center text-white/20 text-[10px] mt-6 tracking-[0.3em] uppercase">
          Global Goods Nocturnal Essentials
        </p>
      </div>
    </div>
  );
}
