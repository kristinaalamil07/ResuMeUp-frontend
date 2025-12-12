import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/"); // redirect to landing page
  }

  // Button classes for navbar links
  const linkButtonClasses =
    "px-4 py-2 rounded-xl font-semibold bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-colors";

  const logoutButtonClasses =
    "px-4 py-2 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors";

  return (
    <nav
      className="flex justify-between items-center p-6 shadow-md"
      style={{
        background: "linear-gradient(135deg, #3b82f6, #1e40af)", // shiny blue gradient
        backgroundSize: "200% 200%",
        animation: "shine 10s ease-in-out infinite"
      }}
    >
      {/* Left side - Logo */}
      <Link to="/" className="text-2xl font-bold text-white">
        ResuMeUp
      </Link>

      {/* Right side */}
      <div className="flex space-x-2">
        <Link to="/" className={linkButtonClasses}>
          Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className={linkButtonClasses}>
              Login
            </Link>
            <Link to="/signup" className={linkButtonClasses}>
              Signup
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className={linkButtonClasses}>
              Profile
            </Link>
            <button onClick={handleLogout} className={logoutButtonClasses}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* Keyframes for shine effect */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </nav>
  );
}
