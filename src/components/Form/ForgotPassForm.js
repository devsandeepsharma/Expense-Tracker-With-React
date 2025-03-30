import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitFormHandler = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(email === "") {
            setError("Invalid Field");
            setLoading(false);
            return;
        }

        forgotPass();
    }

    const forgotPass = async () => {
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email,
                }),
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error.message);
            }

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
                <h1>Forgot Password Page</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                <button className="primary" type={loading ? "button" : "submit"}>
                    {loading ? "Sending Request" : "Forgot Password"}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default ForgotPassForm;