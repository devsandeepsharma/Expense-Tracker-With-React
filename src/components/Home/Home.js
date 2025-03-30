import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AddExpenseForm from "./AddExpenseForm";
import "./home.css";

const Home = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const verifyEmail = async ( ) => {

        const token = localStorage.getItem("token"); 
        if (!token) {
            throw new Error("User not authenticated. Please log in again.");
        }

        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: token,
                }),
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error.message);
            }

            console.log("Verification email sent!");
            console.log(data);
            setError("");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <header>
                <h1>Expense Tracker</h1>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "16px"}}>
                    <Link to="/edit">Edit Profile</Link>
                    <button className="secondary" onClick={logoutUser}>Logout</button>
                </div>
            </header>
            <main>
                <h2>Welcome to expense tracker</h2>
                <button className="secondary" onClick={verifyEmail}>
                    {loading ? "Verifing..." : "Verify Email"}
                </button>
                <p>{error && error}</p>
                {token && <AddExpenseForm />}
            </main>
        </>
    )
}

export default Home;