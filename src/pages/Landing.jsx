import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Template previews
import template1 from "../assets/templates/template1.png";
import template2 from "../assets/templates/template2.png";
import template3 from "../assets/templates/template3.png";
import template4 from "../assets/templates/template4.png";
import template5 from "../assets/templates/template5.png";
import template6 from "../assets/templates/template6.png";
import template7 from "../assets/templates/template7.png";
import template8 from "../assets/templates/template8.png";
import template9 from "../assets/templates/template9.png";

export default function Landing({ isLoggedIn }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const templates = [
    { id: 1, img: template1, name: "Modern Professional Resume" },
    { id: 2, img: template2, name: "Minimalist Clean Resume" },
    { id: 3, img: template3, name: "Creative Designer Resume" },
    { id: 4, img: template4, name: "Corporate Executive Resume" },
    { id: 5, img: template5, name: "Student Entry-Level Resume" },
    { id: 6, img: template6, name: "Elegant Serif Resume" },
    { id: 7, img: template7, name: "Technical Skills Resume" },
    { id: 8, img: template8, name: "Simple ATS-Friendly Resume" },
    { id: 9, img: template9, name: "Classic Formal Resume" },
  ];

  const handleCustomize = (id) => {
  if (!isLoggedIn) {
    navigate("/login");
  } else if (currentUser?.isAdmin) {
    alert("Admin cannot customize user templates!");
  } else {
    // Navigate to Resume Builder Template 1 only for template id 1
    if (id === 1) {
      navigate("/resume-builder-template1");
      navigate("/resume-builder-template2");

    }
  }
  setSelectedTemplate(null);
};


  return (
    <div
      className="min-h-screen p-10 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #ffffff, #fefcfb, #f3f1ee)",
        backgroundSize: "200% 200%",
        animation: "shine 15s ease-in-out infinite",
      }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Resume Templates
      </h1>

      {/* TEMPLATE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer p-2"
            style={{ width: "12rem", height: "18rem" }}
          >
            <img
              src={template.img}
              alt={template.name}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="relative bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full flex gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center
                         rounded-full bg-white shadow-lg border border-gray-200
                         text-gray-700 text-xl font-bold
                         hover:bg-gray-100 hover:scale-105 transition"
              aria-label="Close"
            >
              ×
            </button>

            {/* PREVIEW IMAGE */}
            <div className="w-1/2 flex justify-center items-center">
              <img
                src={selectedTemplate.img}
                alt={selectedTemplate.name}
                className="max-h-[450px] object-contain rounded-lg"
              />
            </div>

            {/* INFO + CTA */}
            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedTemplate.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Resume (Legal Size – Portrait)
                </p>
                <p className="text-sm text-gray-500 mb-10">21.59 × 33.02 cm</p>
              </div>

              {!currentUser?.isAdmin && (
                <button
                  onClick={() => handleCustomize(selectedTemplate.id)}
                  className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Customize Template
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
