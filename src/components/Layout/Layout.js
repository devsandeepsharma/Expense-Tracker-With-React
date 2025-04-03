import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignupForm from "../Form/SignupForm"
import LoginForm from "../Form/LoginForm"
import Home from "../Home/Home"
import EditProfile from "../Home/EditProfile"
import ForgotPassForm from "../Form/ForgotPassForm"
import PrivateRoute from "./PrivateRoute"
import AuthWrapper from "./AuthWrapper"

const Layout = (props) => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                    <AuthWrapper>
                        <PrivateRoute><Home /></PrivateRoute>
                    </AuthWrapper>
                )
        },
        {
            path: "/login",
            element: (
                <AuthWrapper>
                    <LoginForm />
                </AuthWrapper>
            )
        },
        {
            path: "/signup",
            element: (
                <AuthWrapper>
                    <SignupForm />
                </AuthWrapper>
            )
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
            element: (
                <AuthWrapper>
                    <ForgotPassForm />
                </AuthWrapper>
            )
        },
    ])

    return (
        <RouterProvider router={router}>
            <AuthWrapper>

            </AuthWrapper>
        </RouterProvider>
    )
}

export default Layout;