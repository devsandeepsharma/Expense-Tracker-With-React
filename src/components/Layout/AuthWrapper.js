import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../store/auth";

const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            dispatch(authActions.logout());
            navigate("/login");
        } else {
            dispatch(authActions.login(user));
            navigate("/");
        }
    }, [dispatch]);

    return <>{children}</>
}

export default AuthWrapper;