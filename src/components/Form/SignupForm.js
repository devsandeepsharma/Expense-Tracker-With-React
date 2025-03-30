import { useState } from "react";

import "./signupForm.css";

const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [error, setError] = useState("");

    const submitFormHandler = (e) => {
        e.preventDefault();
        setError("");

        if(email === "" || password === "" || conPassword === "") {
            setError("Invalid Field");
            return;
        }

        if(password !== conPassword) {
            setError("Check Your Password Again");
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
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={submitFormHandler}>
                <h1>Signup Page</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                <input type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} placeholder="Confirm Password" />
                <button className="primary" type="submit">Signup</button>
                <button type="button">have an account already</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default SignupForm;