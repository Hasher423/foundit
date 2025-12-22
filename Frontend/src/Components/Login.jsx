import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Login() {
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/auth/google?code=${authResult['code']}`, {
                    withCredentials: true
                });
                console.log(result, "Done");

                const { user, } = result.data;

                const info = { user }

                localStorage.setItem('user-info', JSON.stringify(info))
                navigator('/dashboard')
            }
        } catch (err) {
            setError("Login failed. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const GoogleLogin = useGoogleLogin({
        onSuccess: handleGoogleLogin,
        onError: handleGoogleLogin,
        flow: "auth-code",
    });

    // Wrapper to set loading before triggering Google login
    const handleLoginClick = () => {
        setLoading(true);
        setError("");
        GoogleLogin();
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            {/* Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl max-w-md w-full p-8 text-center transform transition-all duration-300 hover:scale-105 z-10">
                {/* App Logo */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">FoundIt</h1>
                </div>

                {error && (
                    <p className="text-red-500 mb-4 bg-red-100/50 p-3 rounded-lg text-sm flex items-center justify-center">
                        {error}
                    </p>
                )}

                {/* Google Login Button */}
                <button
                    onClick={handleLoginClick}
                    disabled={loading}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 shadow-sm"
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            ></path>
                        </svg>
                    ) : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C37.7 33.2 33.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                        <path fill="#34A853" d="M6.3 14.7l7.4 5.4c1.4-3.7 5-6.4 9.3-6.4 3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 15.3 2 7.8 7.2 6.3 14.7z" />
                        <path fill="#FBBC05" d="M24 45c5.9 0 10.9-2.1 14.6-5.7l-6.8-5.8c-2 1.4-4.6 2.2-7.8 2.2-7.1 0-12.9-5.7-12.9-12.7h-13v8c3.7 7.3 11.3 12.3 20 12.3 5.9 0 11-2.1 14.6-5.7z" />
                        <path fill="#EA4335" d="M6.3 33.3c-3.7-7.3-3.7-15.9 0-23.2l-7.4-5.4c-5.3 10.5-5.3 22.9 0 33.4l7.4-5.4z" />
                        <path fill="#4285F4" d="M45 24c0-1.3-.2-2.7-.5-4H24v8h11.8c-.5 2.6-2 4.8-4.3 6.3l6.8 5.8C42.1 35.9 45 30.3 45 24z" />
                    </svg>}
                    <span>{loading ? "Redirecting..." : "Continue with Google"}</span>
                </button>
            </div>
        </div>
    );
}
