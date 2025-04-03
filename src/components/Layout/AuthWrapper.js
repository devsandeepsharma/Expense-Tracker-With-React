import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../store/auth";

const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(authActions.logout());
            navigate("/login");
        } else {
            dispatch(authActions.login(token));
            navigate("/");
        }
    }, [dispatch]);

    return <>{children}</>
}

export default AuthWrapper;