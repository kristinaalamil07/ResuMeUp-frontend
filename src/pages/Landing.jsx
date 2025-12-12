import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../lib/auth"; // your signup function

export default function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (signup(email, password)) {
      setIsLoggedIn(true);
      navigate("/"); // redirect to landing/home
    } else {
      alert("Signup failed");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #ffffff, #ebf4ff, #e0f0ff)", // soft pearl blue gradient
        backgroundSize: "200% 200%",
        animation: "shine 12s ease-in-out infinite",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white rounded-xl shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-400 text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-500 transition-colors"
        >
          Sign Up
        </button>
      </form>

      {/* Subtle shine animation */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
