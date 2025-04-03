import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./form.css";

const SignupForm = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(email === "" || password === "" || conPassword === "") {
            setError("Invalid Field");
            setLoading(false);
            return;
        }

        if(password !== conPassword) {
            setError("Check Your Password Again");
            setLoading(false);
            return;
        }

        createUser({email, password});
    }

    const createUser = async (userData) => {
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                body: JSON.stringify(userData)
            })

            const user = await res.json();

            if (!res.ok) {
                throw new Error(user.error.message || "Signup failed");
            }

            console.log(user);
            setError("");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={submitFormHandler}>
                <h1>Signup Page</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                <input type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} placeholder="Confirm Password" />
                <button className="primary" type={loading ? "button" : "submit"}>
                    {loading ? "Sending Request" : "Signup"}
                </button>
                <Link to="/login" className="secondary">have an account already</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default SignupForm;