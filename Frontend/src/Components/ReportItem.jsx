import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});


const ReportItem = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    type: "lost",
    itemType: "",
    category: "",
    description: "",
    date: "",
    title: "",
    location: "",
    imageFile: null,
  });

  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setMarkerPosition(coords);
          setFormData((prev) => ({
            ...prev,
            location: [
              parseFloat(coords[1].toFixed(4)),
              parseFloat(coords[0].toFixed(4)),
            ],
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

  // Map click handler
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const coords = [e.latlng.lat, e.latlng.lng];
        setMarkerPosition(coords);
        setFormData((prev) => ({
          ...prev,
          location: `${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`,
        }));
      },
    });
    return null;
  };

  // Handle file input
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
      }));
    }
  };

  // Submit report
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("image", formData.imageFile);
      formdata.append("type", formData.type);
      formdata.append("category", formData.category);
      formdata.append("date", formData.date);
      formdata.append("description", formData.description);
      formdata.append("location", formData.location);
      formdata.append("title", formData.title);
      formdata.append("Email", user.email);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/item/report`,
        formdata,
        { withCredentials: true }
      );    

      console.log(data)

      if (data.success) {
        // navigate("/dashboard"); // redirect on success
      } else {
        setError("Failed to submit report. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingLocation)
    return (
      <div className="text-center mt-8">Fetching your location...</div>
    );

  return (
    <div className="max-w-3xl font-NeueMachina mx-auto my-8 p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-2xl font-bold">Report an Item</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            className="flex-1 p-2 border rounded"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <input
            type="text"
            placeholder="Item Type (e.g., Wallet)"
            value={formData.itemType}
            onChange={(e) =>
              setFormData({ ...formData, itemType: e.target.value })
            }
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

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
        </select>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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

        <p className="text-sm text-gray-600">
          Selected Location: {formData.location}
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 text-white rounded ${
            submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportItem;
