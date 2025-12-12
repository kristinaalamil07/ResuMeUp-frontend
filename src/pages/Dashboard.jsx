import { getUserFromToken } from "../lib/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = getUserFromToken();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p>Welcome, {user?.email || "User"}!</p>
      <Link to="/resumes" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Go to My Resumes</Link>
    </div>
  );
}
