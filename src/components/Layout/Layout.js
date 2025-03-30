import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignupForm from "../Form/SignupForm"
import LoginForm from "../Form/LoginForm"

const Layout = (props) => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <h1>Welcome to expense Tracker</h1>
        },
        {
            path: "/login",
            element: <LoginForm />
        },
        {
            path: "/signup",
            element: <SignupForm />
        }
    ])

    return (
        <RouterProvider router={router}>
            {props.children}
        </RouterProvider>
    )
}

export default Layout;