import { Link } from "react-router-dom"; // Assuming React Router is used for navigation

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-4 relative overflow-hidden">
      {/* Subtle background elements for visual interest */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl max-w-md w-full p-8 text-center transform transition-all duration-300 hover:scale-105 z-10">
        {/* App Logo/Branding */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">FoundIt</h1>
          <p className="text-sm text-gray-600 mt-2">Oops! Looks like this page is lost somewhere...</p>
        </div>

        <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
        <p className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for seems to have wandered off. Maybe it's out there waiting to be found!
        </p>

        {/* Fun illustration or icon */}
        <div className="flex justify-center mb-8">
          <svg
            className="h-24 w-24 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <Link
          to="/"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>Go Back Home</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h2a1 1 0 011 1v3"
            />
          </svg>
        </Link>

        {/* Footer with subtle note */}
        <p className="text-xs text-gray-500 mt-6">
          Or search for lost items on{" "}
          <Link to="/" className="text-indigo-600 hover:underline">FoundIt</Link>.
        </p>
      </div>
    </div>
  );
}