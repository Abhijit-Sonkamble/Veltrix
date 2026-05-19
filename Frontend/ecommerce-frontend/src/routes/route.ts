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

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: 'login',
                Component: LoginPage
            },
            {
                path: 'forgot-password',
                Component: ForgotPasswordPage
            },
            {
                path: 'otp-verify',
                Component: OTPVerifyPage
            },
            {
                path: 'new-password',
                Component: NewPasswordPage
            },

            {
                path: '', // Base path for dashboard components
                Component: AppLayout, // Ye layout ab inn sabke charo taraf apply hoga
                children: [
                    {
                        path: 'dashboard',
                        Component: Home
                    },
                    // Yaha aap apne baaki admin/product routes daal sakte hain:
                    { path: 'orders', Component: Orders },
                    { path: 'products/add', Component: AddProducts },
                    { path: 'products/view', Component: ViewProducts     },

                    //Admin
                    { path: 'admin/add', Component: AddAdmin },
                    { path: 'admin/view', Component: ViewAdmin },


                    //User
                    { path: 'user/add', Component: AddUser },
                    { path: 'user/view', Component: ViewUser },

                    //Category
                    { path: 'category/add', Component: AddCategory },
                    { path: 'category/view', Component: ViewCategory },

                    //SubCategory
                    { path: 'subcategory/add', Component: AddSubCategory },
                    { path: 'subcategory/view', Component: ViewSubCategory },
                ]
            }
        ]
    }
]);