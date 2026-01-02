import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  linkWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.js';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storeUserInDb = async (idToken) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/auth`, {}, {
        headers: { Authorization: `Bearer ${idToken}` },
        withCredentials: true
      });
      if (res.data.sucess) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) return setError('Fill in all fields');

    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await storeUserInDb(idToken);
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('No account found with this email.');
      else if (err.code === 'auth/wrong-password') setError('Incorrect password.');
      else setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true) 
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const pendingEmail = sessionStorage.getItem('pendingEmailCred');
      if (pendingEmail) {
        const { email, password } = JSON.parse(pendingEmail);
        const emailCred = EmailAuthProvider.credential(email, password);
        await linkWithCredential(result.user, emailCred);
        sessionStorage.removeItem('pendingEmailCred');
      }
      const idToken = await result.user.getIdToken();
      await storeUserInDb(idToken);
    } catch (err) {
      if (err.code === 'auth/popup-blocked') setError('Popup blocked, allow popups.');
      else setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsSubmitting(true)
      const result = await signInWithPopup(auth, new GithubAuthProvider());
      const pendingEmail = sessionStorage.getItem('pendingEmailCred');
      if (pendingEmail) {
        const { email, password } = JSON.parse(pendingEmail);
        const emailCred = EmailAuthProvider.credential(email, password);
        await linkWithCredential(result.user, emailCred);
        sessionStorage.removeItem('pendingEmailCred');
      }
      const idToken = await result.user.getIdToken();
      await storeUserInDb(idToken);
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = GithubAuthProvider.credentialFromError(err);
        if (pendingCred) {
          sessionStorage.setItem('pendingGithub', JSON.stringify({
            token: pendingCred.accessToken,
            secret: pendingCred.secret
          }));
        }
        setError('Account exists. Sign in with Google or email/password to link.');
      } else if (err.code === 'auth/popup-blocked') setError('Popup blocked, allow popups.');
      else setError(err.message);
    }
  };

  return (
    <>
      <div className='h-full w-full absolute top-0 left-0'>
        <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/sheryians/job_portal_uploads/bggggg_N0FaIX7D3.mp4?updatedAt=1761376198530"></video>
      </div>
      <div className="md:flex relative z-10 h-screen  bg-cover w-full font-NeueMachina text-white overflow-hidden">
        {/* Left side image */}
        <div className="flex-[.8] md:block hidden m-[clamp(1rem,calc(.5vw+.7rem),3rem)] 
                      rounded-2xl bg-cover bg-center flex flex-col justify-center relative overflow-hidden">
          <h1 className="text-[clamp(2rem,calc(3.5vw+.9rem),6rem)]  absolute bottom-10 font-extralight  w-full leading-none">
            Track Down Your Lost <span className="">Belongings</span>
          </h1>
        </div>

        {/* Right side login form */}
        <div className="flex-1 flex flex-col justify-center items-center p-10">
          <h2 className="text-4xl font-bold mb-10">Welcome BAck!</h2>
          <div className="bg-gray-900 rounded-lg p-6 w-80">
            <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
              <input
                type="email"
                placeholder="Email"
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
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
              </button>
            </form>

            {/* Signup link */}
            <p className="text-sm text-gray-400 mt-3 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="flex flex-col w-80 gap-3 mt-5">
            <button
              onClick={handleGoogleLogin}
              className="p-3 bg-blue-800 text-white rounded font-bold flex items-center justify-center"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5 mr-2 rounded-full" />
              Continue with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="p-3 bg-gray-900 text-white rounded font-bold flex items-center justify-center"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-5 h-5 mr-2 rounded-full invert" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
