import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationName = ({ lat, lng }) => {
    const [locationName, setLocationName] = useState("Loading...");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(
                    "https://nominatim.openstreetmap.org/reverse",
                    {
                        params: {
                            lat,
                            lon: lng,
                            format: "json",
                        },
                    }
                );
                setLocationName(response.data.display_name || "Unknown location");
            } catch (err) {
                console.error(err);
                setLocationName("Unknown location");
            }
        };

        fetchLocation();
    }, [lat, lng]);

    return <span>{locationName}</span>;
};

export default LocationName;
