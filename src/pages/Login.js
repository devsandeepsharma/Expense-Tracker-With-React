import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import formValidate from "../utils/formValidate";
import { loginUser } from "../services/auth";
import "./form.css";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const errorMessages = formValidate(formData);

        if(errorMessages) {
            setError(errorMessages);
            setLoading(false);
            return;
        }

        setError({
            email: '',
            password: ''
        })

        const user = await loginUser(formData);
        
        if(!user.localId) {
            setError(user);
            setLoading(false);
            return;
        }

        const userData = {
            userId: user.localId,
            token: user.idToken
        }

        localStorage.setItem("user", JSON.stringify(user))
        setLoading(false);
        navigate("/");
    }

    return (
        <form className="form" onSubmit={handleFormSubmit} noValidate>
            <h2>Hey, Welcome Back 👋</h2>
            <Input 
                name="email"
                type="email"
                labelText="Enter Your Email here.."
                placeholder="dummy@gmail.com"
                errText={error.email}
                value={formData.email}
                onChange={handleChange}
            />
            <Input 
                name="password"
                type="password"
                labelText="Enter Your Password here.."
                placeholder="123567"
                errText={error.password}
                value={formData.password}
                onChange={handleChange}
            />
            <p className="forgotpass-link"><Link to="/forgot">Forgot Password</Link></p>
            <Button 
                className="btn-primary"
                disabled={loading}
            >
                {
                    loading 
                        ? <>Logging in... <Spinner /></>
                        : "Login "
                }
            </Button>
            <p className="form-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
    )
}

export default Login;