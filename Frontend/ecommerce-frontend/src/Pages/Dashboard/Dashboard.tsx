import { useNavigate } from "react-router"

export default function Dashboard(){
    const navigate = useNavigate()
    return <>
    <h1>Dashboard</h1>
    <button onClick={()=>{
        localStorage.removeItem('adminToken');
        navigate("/login")
    }}>Logouttttt</button>
    </>
}