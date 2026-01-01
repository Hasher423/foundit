import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, fetchSignInMethodsForEmail, linkWithPopup, linkWithCredential, updateProfile, EmailAuthProvider, } from 'firebase/auth'
import { auth } from '../Firebase/Firebase.js';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsSubmitting(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredentials.user, { displayName: name });
            const idToken = await userCredentials.user.getIdToken();
            await storeUserInDb(idToken);
            setEmail('');
            setPassword('');

        } catch (err) {
            // Check if account exists with different provider
            if (err.code === 'auth/email-already-in-use') {
                const existingProviders = await fetchSignInMethodsForEmail(auth, email);
                console.log(existingProviders)
                setError(`This email is already registered. Sign in using google to link.`);

                // Save pending email/password credential for linking
                const pendingCred = EmailAuthProvider.credential(email, password);
                sessionStorage.setItem('pendingEmailCred', JSON.stringify(pendingCred.toJSON()));
            } else {
                console.log(err)
                setError('An error occurred during submission. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };



    const getFirebaseIdToken = async () => {
        const user = auth.currentUser;
        if (!user) {
            console.log("No user logged in");
            return null;
        }

        try {
            const idToken = await user.getIdToken(); // <-- this is your token
            console.log("Firebase ID Token:", idToken);
            return idToken;
        } catch (err) {
            console.error("Failed to get ID token:", err);
            return null;
        }
    };

    const storeUserInDb = async (idToken) => {
        try {
            const serverResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/auth`, {}, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                },
                withCredentials: true
            });
            console.log(serverResponse.data)
            const { sucess, user } = serverResponse.data;
            if (sucess) {
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/dashboard');
            }

            return serverResponse.data;
        } catch (err) {
            console.log(err);
            return err;
        }

    }


    const handleGoogleLogin = async () => {
        try {

            setIsSubmitting(true);
            const result = await signInWithPopup(auth, new GoogleAuthProvider());

            // Link pending GitHub credential
            const pendingGithub = sessionStorage.getItem('pendingGithub');
            if (pendingGithub) {
                const { token, secret } = JSON.parse(pendingGithub);
                const githubCred = GithubAuthProvider.credential(token, secret || undefined);
                await linkWithCredential(result.user, githubCred);
                sessionStorage.removeItem('pendingGithub');
            }

            // Link pending Email/Password credential
            const pendingEmail = sessionStorage.getItem('pendingEmailCred');
            if (pendingEmail) {
                const emailCred = EmailAuthProvider.credential(email, password);
                await linkWithCredential(result.user, emailCred);
                sessionStorage.removeItem('pendingEmailCred');
            }

            const idToken = await result.user.getIdToken();
            await storeUserInDb(idToken);

        } catch (err) {
            if (err.code === 'auth/popup-blocked') {
                setError('Popup blocked. Allow popups and try again.');
            } else {
                setError(err.message);
            }
        } finally {
            setIsSubmitting(false)
        }
    };





    const handleGithubLogin = async () => {
        try {

            setIsSubmitting(true);
            const result = await signInWithPopup(auth, new GithubAuthProvider());
            const idToken = await result.user.getIdToken();
            await storeUserInDb(idToken);
        } catch (err) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                // Save pending GitHub credential for linking
                const pendingCred = GithubAuthProvider.credentialFromError(err);
                if (pendingCred) {
                    sessionStorage.setItem('pendingGithub', JSON.stringify({
                        token: pendingCred.accessToken,
                        secret: pendingCred.secret
                    }));
                }
                setError('Account exists. Sign in with Google or email/password to link.');
            } else if (err.code === 'auth/popup-blocked') {
                setError('Popup blocked. Allow popups and try again.');
            } else {
                setError(err.message);
            }
        } finally {
            setIsSubmitting(false)
        }
    };








    return (
        <>
            <div className='h-full w-full absolute top-0 left-0 '>
                <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/sheryians/job_portal_uploads/bggggg_N0FaIX7D3.mp4?updatedAt=1761376198530"></video>
            </div>
            <div className="md:flex h-screen relative z-10  bg-cover w-full md:bg-[url('')] ">

                {/* Left side with abstract background and text */}
                <div className="flex-[.8] md:block hidden text-white font-NeueMachina m-[clamp(1rem,calc(.5vw+.7rem),3rem)] 
                      rounded-2xl bg-cover bg-center flex flex-col justify-center relative overflow-hidden">
                    <h1 className="text-[clamp(2rem,calc(3.5vw+.9rem),6rem)]  absolute bottom-10 font-extralight  w-full leading-none">
                        Track Down Your Lost <span className="">Belongings </span>
                    </h1>
                </div>

                {/* Right side with form */}
                <div className="flex-1 flex flex-col font-NeueMachina justify-center items-center p-10 ">
                    <h2 className="text-4xl font-bold mb-10 text-white">Registration</h2>
                    <div className="bg-gray-900 rounded-lg p-6 w-80">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <input
                                type="text"
                                placeholder="Enter Your name "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-3 rounded border border-gray-600 bg-gray-800 text-white"
                            />
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 rounded border border-gray-600 bg-gray-800 text-white"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 rounded border border-gray-600 bg-gray-800 text-white"
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="p-3 bg-blue-600 text-white rounded font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'CONTINUE'}
                            </button>
                        </form>
                        <p className="text-sm text-gray-400 mt-3 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 font-semibold hover:underline">
                                login
                            </Link>
                        </p>
                    </div>

                    {/* Social login buttons */}
                    <div className="flex flex-col w-80 gap-3 mt-5">
                        <button
                            onClick={handleGoogleLogin}
                            className="p-3 bg-blue-800 text-white rounded font-bold cursor-pointer flex items-center justify-center"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="Google"
                                className="w-5 h-5 mr-2 rounded-full"
                            />
                            Continue with Google
                        </button>
                        <button
                            onClick={handleGithubLogin}
                            className="p-3 bg-gray-900 text-white rounded font-bold cursor-pointer flex items-center justify-center"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                                alt="GitHub"
                                className="w-5 h-5 mr-2 rounded-full invert"
                            />
                            Continue with GitHub
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;