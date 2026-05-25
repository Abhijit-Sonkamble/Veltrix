import axios from "axios";

const MAIN_URL = "http://localhost:1000/api/admin";


export const fetchAllAdmin = async () => {
    try {

        const token = localStorage.getItem('adminToken');
        const res = await axios.get(MAIN_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch All Admin Failed");
        console.log("Error : ", error);
    }
}