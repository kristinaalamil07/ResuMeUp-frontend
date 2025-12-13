import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Simple mock login validation
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #ffffff, #ebf4ff, #e0f0ff)",
        backgroundSize: "200% 200%",
        animation: "shine 12s ease-in-out infinite",
      }}
    >
      <form className="max-w-md w-full p-6 bg-white rounded-xl shadow space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Login
        </button>

        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
