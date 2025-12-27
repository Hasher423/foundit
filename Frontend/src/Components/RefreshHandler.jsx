import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const RefreshHandler = ({ setIsAuthenticated, element }) => {
    const navigate = useNavigate();
    const [isloggedIn, setisloggedIn] = useState(false)

    useEffect(() => {

        const verifyLogin = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/isloggedIn`, {
                    withCredentials: true,
                });
                const { loggedIn } = response.data;
                console.log(loggedIn)
                if (loggedIn) {
                    setisloggedIn(true)
                }
            } catch (err) {
                console.log(err)
                navigate('/login')
            }
        };

        verifyLogin();
    }, []);







    if (isloggedIn === false) return <div>Checking...</div>

    return isloggedIn ? element : <Navigate to="/login" />;
};

export default RefreshHandler;
