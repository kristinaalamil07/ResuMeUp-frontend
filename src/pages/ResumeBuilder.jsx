import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Import template images
import template1 from "../assets/templates/template1.png";
import template2 from "../assets/templates/template2.png";
import template3 from "../assets/templates/template3.png";
import template4 from "../assets/templates/template4.png";
import template5 from "../assets/templates/template5.png";
import template6 from "../assets/templates/template6.png";
import template7 from "../assets/templates/template7.png";
import template8 from "../assets/templates/template8.png";
import template9 from "../assets/templates/template9.png";

export default function ResumeBuilder() {
  const { templateId } = useParams();

  const templates = {
    1: template1,
    2: template2,
    3: template3,
    4: template4,
    5: template5,
    6: template6,
    7: template7,
    8: template8,
    9: template9,
  };

  const selectedTemplate = templates[templateId] || template1;

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });

  // Export resume as PDF
  const exportPDF = () => {
    const input = document.getElementById("resume-preview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 595, 842); // A4
      pdf.save("resume.pdf");
    });
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Your Resume
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Education"
            value={userInfo.education}
            onChange={(e) =>
              setUserInfo({ ...userInfo, education: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Experience"
            value={userInfo.experience}
            onChange={(e) =>
              setUserInfo({ ...userInfo, experience: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Skills"
            value={userInfo.skills}
            onChange={(e) => setUserInfo({ ...userInfo, skills: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Preview Section */}
        <div className="flex-1 flex flex-col items-center">
          <div
            id="resume-preview"
            className="p-6 bg-white rounded-xl shadow-lg relative w-full"
            style={{ minHeight: "500px" }}
          >
            {/* Template background */}
            <img
              src={selectedTemplate}
              alt="Template"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-25 rounded-xl"
            />

            {/* User info overlay */}
            <div className="relative space-y-2">
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
              <p>{userInfo.email}</p>
              <div>{userInfo.education}</div>
              <div>{userInfo.experience}</div>
              <div>{userInfo.skills}</div>
            </div>
          </div>

          {/* Export button */}
          <button
            onClick={exportPDF}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        </div>
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
    </div>
  );
}
