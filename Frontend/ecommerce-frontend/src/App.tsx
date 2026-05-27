import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router"; // Outlet import karna zaroori hai
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allRoutes } from "./routes/route";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Navigate Dashboard
      navigate(allRoutes.dashboard);
    } else {
      // Navigate Login Page
      navigate(allRoutes.login);
    }
  }, []);
  return (
    <>
      {/* Global Notifications jo har page par available rahengi */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="bg-slate-900 border border-slate-700/50 backdrop-blur-xl text-slate-200 shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-xl"
      />

      {/* Outlet wo jagah hai jahan router dynamically aapke pages (Login, Dashboard) render karega */}
      <Outlet />
    </>
  );
}

export default App;
