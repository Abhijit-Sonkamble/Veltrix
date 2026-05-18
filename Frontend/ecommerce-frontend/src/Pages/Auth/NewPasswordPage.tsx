import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { SetNewPassword } from "../../services/auth/authService";
// import { updatePasswordService } from "../../services/auth/authService"; 

export default function NewPasswordPage() {
  const [newPasswordData, setNewPasswordData] = useState({ newPassword: "", changePassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFormSubmit = async (event: any) => {
    event.preventDefault();

    if (!newPasswordData.newPassword || !newPasswordData.changePassword) {
      return toast.error("Please fill all fields");
    }

    if (newPasswordData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    if (newPasswordData.newPassword !== newPasswordData.changePassword) {
      return toast.error("Passwords do not match!");
    }

    setLoader(true);

    // Call your MVC backend service wrapper here:
    const data = await SetNewPassword(newPasswordData.newPassword);
    if (data.status === 200) {
      toast.success("Password updated successfully!");
      navigate("/login");

      sessionStorage.clear();
    } else {
      toast.error(data.message || "Failed to update password");
    }


      setLoader(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500 rounded-full blur-[150px] opacity-10"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          
          {/* Header/Security Icon Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Create New Password
            </h2>
            <p className="text-indigo-200/60 text-xs mt-1 uppercase tracking-widest">
              Secure Your Account
            </p>
          </div>

          <form className="space-y-6" onSubmit={onFormSubmit}>
            {/* New Password Field */}
            <div className="space-y-2 relative">
              <label className="text-indigo-100 text-sm font-medium ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPasswordData.newPassword}
                  onChange={(e) => {
                    setNewPasswordData((prev) => ({ ...prev, newPassword: e.target.value }));
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-12"
                />
                
                {/* Visibility Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-indigo-100 text-sm font-medium ml-1">
                Confirm Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPasswordData.changePassword}
                onChange={(e) => {
                  setNewPasswordData((prev) => ({
                    ...prev,
                    changePassword: e.target.value,
                  }));
                }}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Submit / Reset Action Button */}
            <button
              type="submit"
              disabled={loader}
              className={`
                relative overflow-hidden w-full font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95
                flex items-center justify-center mt-2
                ${loader
                  ? "bg-indigo-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white shadow-lg shadow-indigo-900/40"
                }
              `}
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-5 w-5 rounded-full border-2 border-white/20"></div>
                    <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-t-2 border-white animate-spin"></div>
                  </div>
                  <span className="tracking-wide animate-pulse">
                    Updating Password...
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                </div>
              ) : (
                <span className="flex items-center gap-2 uppercase tracking-wider text-xs font-bold">
                  Save Changes
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Return Options navigation */}
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-indigo-300/60 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>

        {/* Brand Footer */}
        <p className="text-center text-white/20 text-[10px] mt-6 tracking-[0.3em] uppercase">
          Global Goods Nocturnal Essentials
        </p>
      </div>
    </div>
  );
}