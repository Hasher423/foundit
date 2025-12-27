import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import axios, { all } from 'axios';
import { useEffect } from 'react';
import LocationName from './GetLocationName';



const ReportedItems = () => {
    // These states will be sent to backend later
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filteredItems, setfilteredItems] = useState([])

    const getItems = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/item/getItems`, {
            withCredentials: true
        });

        const { allItems } = response.data;
        setItems(allItems)
    }

    const filterItems = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/item/filter${filterType && `?type=${filterType}`}${filterCategory && `&category=${filterCategory}`}`, {
            withCredentials: true
        });

        const { items } = response.data;
        setfilteredItems(items)
    }


    useEffect(() => {

        filterItems()
    }, [filterType, filterCategory])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

    const search = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/item/search?query=${searchTerm}`, {
            withCredentials: true
        });
        const { result } = response.data;

        setfilteredItems(result)

    }



    // useEffect(() => {
    //     getItems()
    // }, [])

    return (
        <div className="max-w-7xl mx-auto my-12 px-4">
            <h2 className="text-3xl font-NeueMachina text-gray-900 mb-8 text-center">
                Reported Lost & Found Items
            </h2>

            {/* Search & Filters (UI ONLY) */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4  py-3 border rounded-lg"
                >
                    <option value="">All Types</option>
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                </select>

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border rounded-lg"
                >
                    <option value="">All Categories</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Personal">Personal</option>
                </select>
            </div>

            {/* Items Grid (NO frontend filtering) */}
            <div className="grid grid-cols-1 font-NeueMachina sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map(item => (
                    <div
                        key={item._id}
                        className="bg-white border rounded-xl shadow-md overflow-hidden"
                    >
                        <img
                            src={item.image}
                            alt='{item.itemType}'
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-6">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${item.type === 'LOST'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-green-100 text-green-700'
                                        }`}
                                >
                                    {item.type}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600">
                                <strong>Category:</strong> {item.category}
                            </p>

                            <p className="text-sm text-gray-600 flex  items-center">
                                <FaMapMarkerAlt className="mr-2 text-blue-500 flex-shrink-0" />
                                <span className="truncate max-w-full">
                                    <LocationName lng={item.location.coordinates[0]} lat={item.location.coordinates[1]} />
                                </span>
                            </p>


                            <p className="text-sm text-gray-600 flex items-center mb-3">
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                {item?.createdAt
                                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })
                                    : "No date"}
                            </p>

                            <p className="text-gray-700 mb-4">
                                {item.description}
                            </p>

                            <div className="flex justify-between">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    View Details
                                </button>
                                <button className="px-4 py-2 bg-gray-200 rounded-lg">
                                    {item.type === 'found' ? 'Claim' : 'Contact'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportedItems;
