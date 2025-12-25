import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      console.log('Form submitted successfully:', { username, password });
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:flex h-screen bg-black bg-cover w-full md:bg-[url('')] bg-[url('https://pg-frontend-pi-six.vercel.app/Images/bg.jpg')] font-NeueMachina text-white overflow-hidden">
      {/* Left side with abstract background and text */}
      <div className="flex-[.8] md:block hidden m-[clamp(1rem,calc(.5vw+.7rem),3rem)] bg-[url('https://pg-frontend-pi-six.vercel.app/Images/bg.jpg')] rounded-2xl bg-cover bg-center flex flex-col justify-center relative overflow-hidden">
        <h1 className="text-[clamp(2rem,calc(3.5vw+.9rem),6rem)] font-extralight ml-2 w-full leading-none">
          Track Down Your Lost <span className="">Belongings</span>
        </h1>
        {/* Overlay for abstract effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(0,0,0,0.2))] mix-blend-overlay"></div>
      </div>

      {/* Right side with form */}
      <div className="flex-1 flex flex-col justify-center items-center p-10 ">
        <h2 className="text-4xl font-bold mb-10">Registration</h2>
        <div className="bg-gray-900 rounded-lg p-6 w-80">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </div>

        {/* Social login buttons */}
        <div className="flex flex-col w-80 gap-3 mt-5">
          <button
            onClick={() => console.log('Continue with Google')}
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
            onClick={() => console.log('Continue with GitHub')}
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
  );
};

export default Signup;