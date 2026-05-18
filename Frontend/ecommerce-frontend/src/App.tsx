import { useEffect } from "react";
import { data, Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";


export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Navigate Dashboard
      navigate('/dashboard');
    } else {
      // Navigate Login Page
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Outlet />
      <ToastContainer/>
    </div>
  )
}