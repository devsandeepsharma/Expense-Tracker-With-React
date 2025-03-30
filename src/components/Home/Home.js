import { useState } from "react";
import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            <header>
                <h1>Expense Tracker</h1>
                <Link to="/edit">Edit Profile</Link>
            </header>
            <main>
                <h2>Welcome to expense tracker</h2>
                <button className="secondary" onClick={verifyEmail}>
                    {loading ? "Verifing..." : "Verify Email"}
                </button>
                <p>{error && error}</p>
            </main>
        </>
    )
}

export default Home;