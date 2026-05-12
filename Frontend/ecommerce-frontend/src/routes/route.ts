import { createBrowserRouter } from "react-router";
import LoginPage from '../Pages/Auth/LoginPage'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/login',
                Component: LoginPage
            },
        ]
    },
]);