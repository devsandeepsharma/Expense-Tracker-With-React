const formValidate = ({email, password, confirmPassword}) => {
    const error = {
        email: "",
        password: "",
        confirmPassword: ""
    }

    if(!email.includes("gmail.com")) {
        error.email = "Hmm, that doesn’t look like a real email.";
    }

    if(password.length < 6) {
        error.password = "Your password must be at least 6 characters long.";
    }

    if(confirmPassword !== undefined && password !== confirmPassword) {
        error.confirmPassword = "Oops! Passwords don’t match.";
    }

    if(Object.values(error).some(msg => msg !== "")) {
        return error
    }

    return null;
}

export default formValidate;