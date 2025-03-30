import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitFormHandler = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(email === "" || password === "") {
            setError("Invalid Field");
            setLoading(false);
            return;
        }

        loginUser({email, password});
    }

    const loginUser = async (userData) => {
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                body: JSON.stringify(userData)
            })

            const user = await res.json();

            if (!res.ok) {
                throw new Error(user.error.message || "Login failed");
            }

            console.log(user);
            setError("");
            setLoading(false);
            navigate("/");
            localStorage.setItem("token", user.idToken);
            
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={submitFormHandler}>
                <h1>Login Page</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                <button className="primary" type={loading ? "button" : "submit"}>
                    {loading ? "Sending Request" : "Login"}
                </button>
                <Link className="secondary" to="/signup">Create new Account</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm;