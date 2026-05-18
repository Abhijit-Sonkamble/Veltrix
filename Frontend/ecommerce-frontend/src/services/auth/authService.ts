import axios from "axios";

const Main_URL = "http://localhost:1000/api/auth/admin/"


//Login
export const loginAdmin = async(data : any) => {

    try {
        
        const res = await axios.post(Main_URL + "loginAdmin", data);

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Admin Login failed")
        console.log("Error ",error)
    }


}

//Forgot Password
export const ForgotPassword = async(email : string) => {

    try {
        
        const res = await axios.post(Main_URL + "forgotPassword", {email});

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Forgot password failed")
        console.log("Error ",error)
    }


}


//OTP Verify
export const OTPVerify = async(OTP:string) => {

    try {
        
        const email = sessionStorage.getItem("email") || "" ; 
        const res = await axios.post(Main_URL + "verifyOTP", {email, OTP :Number(OTP)});

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Forgot password failed")
        console.log("Error ",error)
    }


}


//OTP Verify
export const SetNewPassword = async(newPassword: string) => {

    try {
        
        const email = sessionStorage.getItem("email") || "" ; 
        const res = await axios.post(Main_URL + "newPassword", {email, newPassword});

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Forgot password failed")
        console.log("Error ",error)
    }


}