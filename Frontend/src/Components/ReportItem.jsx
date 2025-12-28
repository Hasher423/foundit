import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";

const ReportItem = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: "lost",
        itemType: "",
        category: "",
        description: "",
        date: "",
        title: "",
        location: "",
        image: null, // store selected file
    });

    const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
    const [loadingLocation, setLoadingLocation] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    setMarkerPosition(coords);
                    setFormData((prev) => ({
                        ...prev,
                        location: [parseFloat(coords[1].toFixed(4)), parseFloat(coords[0].toFixed(4))]
                    }));
                    setLoadingLocation(false);
                },
                (err) => {
                    console.error(err);
                    setLoadingLocation(false);
                }
            );
        } else {
            setLoadingLocation(false);
        }
    }, []);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const coords = [e.latlng.lat, e.latlng.lng];
                setMarkerPosition(coords);
                setFormData((prev) => ({
                    ...prev,
                    location: `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`,
                }));
            },
        });
        return null;
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                imageFile: e.target.files[0],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.imageFile)
        const formdata = new FormData();
        formdata.append("image", formData.imageFile)
        formdata.append("type", formData.type)
        formdata.append("category", formData.category)
        formdata.append("date", formData.date)
        formdata.append("description", formData.description)
        formdata.append("location", formData.location)
        formdata.append("title", formData.title)
        console.log("Form Data Submitted:");
        console.log(formdata);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/item/report`, formdata, );
        console.log(response.data)
        // Here you could use FormData to send image + other data to backend
        // navigate("/dashboard"); 
    };

    if (loadingLocation) return <div className="text-center mt-8">Fetching your location...</div>;

    return (
        <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg space-y-6">
            <h1 className="text-2xl font-bold">Report an Item</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="flex-1 p-2 border rounded"
                    >
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Item Type (e.g., Wallet)"
                        value={formData.itemType}
                        onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                        className="flex-1 p-2 border rounded"
                        required
                    />

                </div>

                <input
                    type="text"
                    placeholder="Item Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="flex-1 w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded"
                />

                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                />

                <div className="h-64 w-full">
                    <MapContainer center={markerPosition} zoom={13} className="h-full w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={markerPosition} />
                        <MapClickHandler />
                    </MapContainer>
                </div>

                <p className="text-sm text-gray-600">Selected Location: {formData.location}</p>

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default ReportItem;
