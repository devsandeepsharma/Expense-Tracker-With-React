import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import formValidate from "../utils/formValidate";
import { createUser } from "../services/auth";
import "./signup.css";

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState({
        email: '',
        password: '',
        confirmPassword: '',
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
            password: '',
            confirmPassword: '',
        })

        const user = await createUser(formData);

        if(user) {
            setError(user);
            setLoading(false);
            return
        }

        setLoading(false);
        navigate("/login");
    }

    return (
        <form className="form" onSubmit={handleFormSubmit} noValidate>
            <h2>Create new Account</h2>
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
            <Input 
                name="confirmPassword"
                type="password"
                labelText="Enter Your Password Again here.."
                placeholder="123567"
                errText={error.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <Button className="btn-primary">
                Signup 
                {loading &&  <Spinner />}
            </Button>
            <p className="form-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
    )
}

export default Signup;