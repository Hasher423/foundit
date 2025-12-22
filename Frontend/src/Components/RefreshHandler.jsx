import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const RefreshHandler = ({ setIsAutheticated }) => {
    const navigate = useNavigate();
    const checkLogin = async () => {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/auth/isloggedIn`, {
            withCredentials: true,
        })

        return response.data;
    }
    useEffect(() => {
        const verify = async () => {
            try {
                const { loggedIn } = await checkLogin(); // ✅ await here

                if (loggedIn) {
                    setIsAutheticated(true);
                    if (window.location.pathname === '/' || window.location.pathname === '/login') {
                        navigate('/dashboard');
                    }
                } else {
                    setIsAutheticated(false);
                    navigate('/login');
                }
            } catch (err) {
                setIsAutheticated(false);
                navigate('/login');
            }
        };

        verify();
    }, [navigate, setIsAutheticated]);

    return (
        null
    )
}

export default RefreshHandler