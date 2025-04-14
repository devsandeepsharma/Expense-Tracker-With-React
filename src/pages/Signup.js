import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import "./signup.css";

const Signup = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    
    return (
        <form className="form" onSubmit={handleFormSubmit} noValidate>
            <h2>Create new Account</h2>
            <Input 
                name="email"
                type="email"
                labelText="Enter Your Email here.."
                placeholder="dummy@gmail.com"
                errText=""
                value={formData.email}
                onChange={handleChange}
            />
            <Input 
                name="password"
                type="password"
                labelText="Enter Your Password here.."
                placeholder="123567"
                errText=""
                value={formData.password}
                onChange={handleChange}
            />
            <Input 
                name="confirmpassword"
                type="password"
                labelText="Enter Your Password Again here.."
                placeholder="123567"
                errText=""
                value={formData.confirmpassword}
                onChange={handleChange}
            />
            <Button className="btn-primary">Signup</Button>
            <p className="form-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
    )
}

export default Signup;