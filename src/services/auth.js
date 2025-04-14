const key = "AIzaSyDmADQQx9NA-3D5knEfkuhtJbI9buxLkYI";

export const createUser = async (userData) => {
    try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
            method: "POST",
            body: JSON.stringify(userData)
        })

        const user = await res.json();

        if (!res.ok) {
            throw new Error(user.error.message || "Something went wrong. Please try again later.");
        }

        return null;
    } catch (error) {
        const errorObj = {email: "", password: "", confirmPassword: ""};

        if(error.message === "EMAIL_EXISTS") {
            errorObj.email = "An account with this email already exists. Try logging in instead.";
        } else {
            errorObj.email = error.message;
            errorObj.password = error.message;
        }

        return errorObj;
    }
}

export const loginUser = async (userData) => {
    try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
            method: "POST",
            body: JSON.stringify(userData)
        })

        const user = await res.json();

        if (!res.ok) {
            throw new Error(user.error.message);
        }

        return user;
    } catch (error) {
        const errorObj = {email: "", password: ""};

        errorObj.email = "Invalid email or password.";
        errorObj.password = "Invalid email or password.";

        return errorObj;
    }
}