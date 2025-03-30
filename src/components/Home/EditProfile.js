import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const [username, setUsername] = useState("");
    const [photo, setPhoto] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitFormHandler = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(username === "" || photo === "") {
            setError("Invalid Field");
            setLoading(false);
            return;
        }

        updateProfile({username, photo});
    }

    const updateProfile = async (userData) => {
        const token = localStorage.getItem("token");
        
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    displayName: username,
                    photoUrl: photo, 
                    returnSecureToken: true, 
                }),
            })

            const user = await res.json();

            if (!res.ok) {
                throw new Error(user.error.message || "Profile update failed.");
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
                <h1>Update Profile</h1>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Name" />
                <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Enter Your Photo Url" />
                <button className="primary" type={loading ? "button" : "submit"}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default EditProfile;