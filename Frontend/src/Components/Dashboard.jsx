import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReportedItems from './ReportedItems';
import Header from './header';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleReportClick = () => {
        // Navigate to a report page or open a modal
        navigate('/reportItem'); // You need to create this route/component
    };

    return (
        <div className=''>
            <Header />
            
            <div className="max-w-6xl mx-auto my-6 flex justify-end">
                <button
                    onClick={handleReportClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Report Item
                </button>
            </div>

            <ReportedItems />
        </div>
    );
};

export default Dashboard;
