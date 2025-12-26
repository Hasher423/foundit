import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const RefreshHandler = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const verifyLogin = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/isloggedIn`, {
                withCredentials: true,
            });
            const { loggedIn } = response.data;
            if (loggedIn) {
                console.log('Working')
                setIsAuthenticated(true)
                navigate('/dashboard')
            } else {

                setIsAuthenticated(false)
                console.log("Working")
                navigate('/signup')
            }
        }

        verifyLogin();
    }, [navigate])
    return null
}

export default RefreshHandler