import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate();
    const  user  = JSON.parse(localStorage.getItem('user'))

    const handleLogout = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/logout`, {
            withCredentials: true,
        });

        const { success } = response.data;
        if (success) {
            localStorage.removeItem('user');
            navigate('/signup')
        }
    }
    return (
        <div className='flex flex-col h-screen gap-6 items-center justify-center'>
            Hello,{user.name}
            <img src={user.avatar} className='w-20 h-20 rounded-3xl' alt="" />
            <button onClick={handleLogout} className='px-2 py-2 bg-red-900 text-white rounded '>Logout</button>
        </div>
    )
}

export default Dashboard