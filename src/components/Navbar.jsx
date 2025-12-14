import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/"); // Redirect to public landing page after logout
  }

  // Navbar buttons - darker beige
  const linkButtonClasses =
    "px-4 py-2 rounded-xl font-semibold bg-[#bfa77a] text-[#3b2f1f] hover:bg-[#a78f5f] hover:text-white transition-colors";

  const logoutButtonClasses =
    "px-4 py-2 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors";

  return (
    <nav
      className="flex justify-between items-center p-6 shadow-md"
      style={{
        background: "linear-gradient(135deg, #d9c7a1, #c9b48f)", // darker beige navbar
        backgroundSize: "200% 200%",
        animation: "shine 10s ease-in-out infinite",
      }}
    >
      <Link to="/" className="text-4xl font-bold text-[#3b2f1f]">
        ResuMeUp
      </Link>

      <div className="flex space-x-2">
        {location.pathname === "/profile" ? (
          <>
            <Link to="/" className={linkButtonClasses}>
              Home
            </Link>
            <button onClick={handleLogout} className={logoutButtonClasses}>
              Logout
            </button>
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <Link to="/profile" className={linkButtonClasses}>
                Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className={linkButtonClasses}>
                  Login
                </Link>
                <Link to="/signup" className={linkButtonClasses}>
                  Signup
                </Link>
              </>
            )}
          </>
        )}
      </div>

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
