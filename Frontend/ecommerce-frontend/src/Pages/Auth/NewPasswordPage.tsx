import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { SetNewPassword } from "../../services/auth/authService";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export default function NewPasswordPage() {
  const [newPasswordData, setNewPasswordData] =
    useState({
      newPassword: "",
      changePassword: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loader, setLoader] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const onFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !newPasswordData.newPassword ||
      !newPasswordData.changePassword
    ) {
      return toast.error(
        "Please fill all fields"
      );
    }

    if (
      newPasswordData.newPassword.length < 6
    ) {
      return toast.error(
        "Password must be at least 6 characters long"
      );
    }

    if (
      newPasswordData.newPassword !==
      newPasswordData.changePassword
    ) {
      return toast.error(
        "Passwords do not match!"
      );
    }

    try {
      setLoader(true);

      const data =
        await SetNewPassword(
          newPasswordData.newPassword
        );

      if (data.status === 200) {
        toast.success(
          "Password updated successfully!"
        );

        sessionStorage.clear();

        navigate("/login");
      } else {
        toast.error(
          data.message ||
            "Failed to update password"
        );
      }
    } finally {
      setLoader(false);
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

      <div className="relative w-full max-w-5xl bg-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,.7)]">

        <div className="flex flex-col lg:flex-row">

          {/* left */}

          <div className="lg:w-1/2 bg-linear-to-br from-[#0F1629] via-[#0A0F1E] to-[#0F1629] p-10 flex flex-col justify-between">

            <div>

              <div className="flex items-center gap-2 mb-12">

                <KeyRound className="w-8 h-8 text-amber-400"/>

                <span className="text-2xl font-bold text-white">
                  Password Reset
                </span>

                <Sparkles className="w-4 h-4 text-amber-400"/>

              </div>

              <div className="space-y-6">

                <div className="inline-flex gap-2 items-center px-3 py-1 rounded-full bg-white/5 border border-white/10">

                  <Shield className="w-4 h-4 text-amber-400"/>

                  <span className="text-xs text-amber-400">
                    SECURE ACCESS
                  </span>

                </div>

                <h1 className="text-5xl font-bold text-white leading-tight">

                  Create your
                  <span className="block bg-linear-to-r from-amber-400 to-white bg-clip-text text-transparent">
                    new password
                  </span>

                </h1>

                <p className="text-gray-400 leading-relaxed">

                  Your password should be secure,
                  memorable and hard to guess.

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
                    End-to-End Protected
                  </p>

                  <p className="text-gray-500 text-xs">
                    Secure password update flow
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
                  Set Password
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  Create a strong password
                </p>

              </div>

              <form
                className="space-y-6"
                onSubmit={onFormSubmit}
              >

                {/* new password */}

                <div>

                  <label className="text-gray-300 text-sm block mb-2">

                    New Password

                  </label>

                  <div className="relative">

                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5"/>

                    <input
                      value={
                        newPasswordData.newPassword
                      }
                      onChange={(e) =>
                        setNewPasswordData(
                          (prev) => ({
                            ...prev,
                            newPassword:
                              e.target.value,
                          })
                        )
                      }
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400"
                    >
                      {showPassword ? (
                        <EyeOff />
                      ) : (
                        <Eye />
                      )}
                    </button>

                  </div>

                </div>

                {/* confirm */}

                <div>

                  <label className="text-gray-300 text-sm block mb-2">

                    Confirm Password

                  </label>

                  <div className="relative">

                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5"/>

                    <input
                      value={
                        newPasswordData.changePassword
                      }
                      onChange={(e) =>
                        setNewPasswordData(
                          (prev) => ({
                            ...prev,
                            changePassword:
                              e.target.value,
                          })
                        )
                      }
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                  </div>

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

                      Updating...

                    </div>
                  ) : (
                    <>
                      Save Password
                      <ArrowRight className="w-4 h-4"/>
                    </>
                  )}

                </button>

              </form>

              <div className="mt-8 text-center">

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

          Global Goods Nocturnal Essentials

        </p>

      </div>

    </div>
  );
}