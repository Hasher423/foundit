import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';

const Dashboard = () => {
    const [user, setuser] = useState('')
    const navigate = useNavigate();
    const logoutHandler = async (e) => {
        e.preventDefault();

        const logoutResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/auth/logout`, {
            withCredentials: true,

        })
        const { success } = logoutResponse.data;
        if (success) {
            localStorage.removeItem('user-info')
            setuser('')
            navigate('/login')
        }


    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user-info'));
        if (data?.user) {
            setuser(data.user); 
        }
    }, []);



    return (
        <div className='flex flex-col items-center gap-10 justify-center h-screen'>
            <div className='font-extrabold'>Hello,{user?.name}</div>
            <img src={user?.avatar} className='w-20 h-20 rounded-2xl' alt="noooooooooooooooooo" />
            <button onClick={logoutHandler} className='bg-red-900 px-6 text-3xl text-white text-center rounded'>logout</button>
        </div>
    )
}

export default Dashboard