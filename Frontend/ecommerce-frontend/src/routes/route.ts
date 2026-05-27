import { createBrowserRouter } from "react-router";
import App from "../App";
import { AppLayout } from "../components/dashboard/AppLayout"; // Aapka Sidebar/Navbar wala layout
import LoginPage from '../Pages/Auth/LoginPage';
import ForgotPasswordPage from "../Pages/Auth/ForgotPasswordPage";
import OTPVerifyPage from "../Pages/Auth/Otp-Verify";
import NewPasswordPage from "../Pages/Auth/NewPasswordPage";
import { Home } from "../Pages/Dashboard/Home";
import { Orders } from "../Pages/Orders/Orders";
import { AddProducts } from "../Pages/Products/AddProducts";
import { AddAdmin } from "../Pages/Admin/AddAdmin";
import { ViewAdmin } from "../Pages/Admin/ViewAdmin";
import { AddCategory } from "../Pages/Category/AddCategory";
import { ViewCategory } from "../Pages/Category/ViewCategory";
import { ViewProducts } from "../Pages/Products/ViewProducts";
import { AddUser } from "../Pages/User/AddUser";
import { ViewUser } from "../Pages/User/ViewUser";
import { AddSubCategory } from "../Pages/SubCategory/AddSubCategory";
import { ViewSubCategory } from "../Pages/SubCategory/ViewSubCategory";
// Import other pages like AddAdmin, AddProducts here

//All Routes
export const allRoutes = {
    login : '/login',
    forgotPassword : '/forgot-password',
    otpVerify : '/otp-verify',
    newPassword : '/new-password',
    dashboard : '/dashboard',
    addAdmin : 'addAdmin',
    viewAdmin : 'viewAdmin',
    orders : 'orders',
    addProduct : 'addProduct',
    ViewProducts : 'viewProducts',
    addUser : 'addUser',
    viewUser : 'viewUser',
    addCategory : 'addCategory',
    viewCategory : 'viewCategory',
    addSubcategory : 'addSubcategory',
    viewSubcategory : 'viewSubcategory',
    addExtracategory : 'addExtracategory',
    viewExtracategory : 'viewExtracategory',

}

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: allRoutes.login,
                Component: LoginPage
            },
            {
                path: allRoutes.forgotPassword,
                Component: ForgotPasswordPage
            },
            {
                path: allRoutes.otpVerify,
                Component: OTPVerifyPage
            },
            {
                path: allRoutes.newPassword,
                Component: NewPasswordPage
            },

            {
                path: allRoutes.dashboard, // Base path for dashboard components
                Component: AppLayout, // Ye layout ab inn sabke charo taraf apply hoga
                children: [
                    {
                        path: allRoutes.dashboard,
                        Component: Home
                    },
                    // Yaha aap apne baaki admin/product routes daal sakte hain:
                    { path: allRoutes.orders, Component: Orders },

                    { path: allRoutes.addProduct, Component: AddProducts },
                    { path: allRoutes.ViewProducts, Component: ViewProducts     },

                    //Admin
                    { path: allRoutes.addAdmin, Component: AddAdmin },
                    { path: allRoutes.viewAdmin, Component: ViewAdmin },


                    //User
                    { path: allRoutes.addUser, Component: AddUser },
                    { path: allRoutes.viewUser, Component: ViewUser },

                    //Category
                    { path: allRoutes.addCategory, Component: AddCategory },
                    { path: allRoutes.viewCategory, Component: ViewCategory },

                    //SubCategory
                    { path: allRoutes.addSubcategory, Component: AddSubCategory },
                    { path: allRoutes.viewSubcategory, Component: ViewSubCategory },

                    //Extra Category
                    { path: allRoutes.addExtracategory, Component: ViewSubCategory },
                    { path: allRoutes.viewExtracategory, Component: ViewSubCategory },
                ]
            }
        ]
    }
]);