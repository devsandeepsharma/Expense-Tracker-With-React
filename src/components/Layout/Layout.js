import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignupForm from "../Form/SignupForm"
import LoginForm from "../Form/LoginForm"
import Home from "../Home/Home"
import EditProfile from "../Home/EditProfile"
import ForgotPassForm from "../Form/ForgotPassForm"

const Layout = (props) => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/login",
            element: <LoginForm />
        },
        {
            path: "/signup",
            element: <SignupForm />
        },
        {
            path: "/edit",
            element: <EditProfile />
        },
        {
            path: "/forgot",
            element: <ForgotPassForm />
        },
    ])

    return (
        <RouterProvider router={router}>
            {props.children}
        </RouterProvider>
    )
}

export default Layout;