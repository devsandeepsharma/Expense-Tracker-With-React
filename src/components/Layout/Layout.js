import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../Home/Home"
import EditProfile from "../Home/EditProfile"
import ForgotPassForm from "../Form/ForgotPassForm"
import PrivateRoute from "./PrivateRoute"
import AuthWrapper from "./AuthWrapper"

import Signup from "../../pages/Signup";
import Login from "../../pages/Login";

const Layout = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <AuthWrapper>
                    <Home />
                </AuthWrapper>
            )
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/edit",
            element: (
                <AuthWrapper>
                    <PrivateRoute><EditProfile /></PrivateRoute>
                </AuthWrapper>
            )
        },
        {
            path: "/forgot",
            element: <ForgotPassForm />
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Layout;