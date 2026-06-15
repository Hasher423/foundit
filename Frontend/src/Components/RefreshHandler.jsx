import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated, element }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/user/isloggedIn`,
          { withCredentials: true }
        );

        const { loggedIn } = response.data;

        setIsLoggedIn(loggedIn);
        setIsAuthenticated?.(loggedIn);
      } catch (err) {
        setIsLoggedIn(false);
        setIsAuthenticated?.(false);
      } finally {
        setLoading(false);
      }
    };

    verifyLogin();
  }, []);

  if (loading) return <div>Checking...</div>;

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default RefreshHandler;
