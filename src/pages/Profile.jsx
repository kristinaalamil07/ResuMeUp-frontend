import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "Kristina Alamil",
    email: localStorage.getItem("userEmail") || "",
    picture: localStorage.getItem("userPicture") || ""
  });

  const [editing, setEditing] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState(["Resume Draft 1", "Resume Draft 2"]);
  const [downloadedTemplates, setDownloadedTemplates] = useState(["Template 1", "Template 5"]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser(prev => ({ ...prev, picture: reader.result }));
        localStorage.setItem("userPicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    setEditing(false);
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #ffffff, #fefcfb, #f3f1ee)",
        backgroundSize: "200% 200%",
        animation: "shine 15s ease-in-out infinite",
      }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Profile</h1>

      {/* User Info Section */}
      <section className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="mb-4">
          {user.picture ? (
            <img src={user.picture} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Show user's name (without "Name:" label) */}
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>

        {editing ? (
          <div className="w-full flex flex-col items-center space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="mb-2"
            />
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-gray-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors mt-2"
          >
            Edit Info
          </button>
        )}
      </section>

      {/* Saved Drafts Section */}
      <section className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Drafts</h2>
        {savedDrafts.length > 0 ? (
          <ul className="space-y-2">
            {savedDrafts.map((draft, i) => (
              <li
                key={i}
                className="bg-gray-200 rounded p-3 flex justify-between items-center"
              >
                {draft}
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : <p>No saved drafts yet.</p>}
      </section>

      {/* Downloaded Templates Section */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Downloaded Templates</h2>
        {downloadedTemplates.length > 0 ? (
          <ul className="space-y-2">
            {downloadedTemplates.map((template, i) => (
              <li
                key={i}
                className="bg-gray-200 rounded p-3 flex justify-between items-center"
              >
                {template}
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">
                  Download Again
                </button>
              </li>
            ))}
          </ul>
        ) : <p>No downloaded templates yet.</p>}
      </section>

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
