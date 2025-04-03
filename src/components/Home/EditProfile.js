import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const [username, setUsername] = useState("");
    const [photo, setPhoto] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

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

    const updateProfile = async () => {
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    displayName: username,
                    photoUrl: photo
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
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const getUserData = async () => {
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: token }),
            })

            const user = await res.json();

            if (!res.ok) {
                throw new Error(user.error.message || "Profile update failed.");
            }

            setUser(user.users[0]);
            setError("");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={submitFormHandler}>
                <h1>{user?.displayName ? "User Details" : "Update Profile"}</h1>
                {
                    user?.displayName ?
                        <>
                            <p>User Name = {user.displayName}</p>
                            <p>User Email = {user.email}</p>
                            <img height="300" src={user.photoUrl} />
                            <button onClick={() => setUser(null)} className="secondary">Edit Profile</button>
                        </>
                    : <>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Name" />
                        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Enter Your Photo Url" />
                        <button className="primary" type={loading ? "button" : "submit"}>
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </>
                }
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default EditProfile;