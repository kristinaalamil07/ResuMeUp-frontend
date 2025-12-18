import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate7() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [photo, setPhoto] = useState("https://via.placeholder.com/150");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-7");
    const canvas = await html2canvas(resume, { scale: 2 });
    const link = document.createElement("a");
    link.download = "resume-template-7.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-7");
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "in", "letter");
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save("resume-template-7.pdf");
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-lg')?.innerText || "No Job Title",
      template: "Template 7",
      data: {} // add more fields if needed
    };
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    navigate("/profile"); // redirect to Profile.jsx
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center py-10">

      {/* FLOATING MENU BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => { setMenuOpen(!menuOpen); setSubmenuOpen(false); }}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}
        >
          <svg className="w-6 h-6 text-[#3b2f1f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* MAIN DROPDOWN */}
        {menuOpen && !submenuOpen && (
          <div className="absolute bottom-16 right-0 w-52 rounded-2xl shadow-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}>
            <button
              onClick={saveAsDraft}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition"
            >
              <span className="font-semibold text-[#3b2f1f]">Save as Draft</span>
            </button>
            <button
              onClick={() => setSubmenuOpen(true)}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition"
            >
              <span className="font-semibold text-[#3b2f1f]">Save Resume</span>
            </button>
          </div>
        )}

        {/* SUBMENU — PDF & PNG */}
        {submenuOpen && (
          <div className="absolute bottom-16 right-0 w-52 rounded-2xl shadow-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}>
            <button
              onClick={saveAsPDF}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition"
            >
              <span className="font-semibold text-[#3b2f1f]">Save as PDF</span>
            </button>
            <button
              onClick={saveAsPNG}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition"
            >
              <span className="font-semibold text-[#3b2f1f]">Save as PNG</span>
            </button>
            <button
              onClick={() => setSubmenuOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition"
            >
              <span className="font-semibold text-[#3b2f1f]">Back</span>
            </button>
          </div>
        )}
      </div>

      {/* RESUME */}
      <div
        id="resume-template-7"
        className="w-[816px] h-[1056px] bg-white shadow-lg grid grid-cols-3 font-sans"
      >
        {/* LEFT SIDEBAR */}
        <div className="bg-[#9C4A32] text-white p-6 h-[1056px] text-[13px] leading-tight">
          {/* PHOTO */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-28 h-28 rounded-full overflow-hidden bg-white cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <p className="text-xs mt-2 opacity-80"></p>
          </div>

          {/* CONTACT */}
          <h2 className="text-base font-semibold mb-3">Contact Details</h2>
          <div className="space-y-2">
            <p contentEditable suppressContentEditableWarning>
              info@maxresumes.com
            </p>
            <p contentEditable suppressContentEditableWarning>
              +91 25 6929 5440
            </p>
            <p contentEditable suppressContentEditableWarning>
              Pune, India, 411001
            </p>
            <p contentEditable suppressContentEditableWarning>
              linkedin.com/in/name
            </p>
          </div>

          {/* SKILLS */}
          <h2 className="text-base font-semibold mt-7 mb-3">Skills</h2>
          {[
            "Programming",
            "Project Management",
            "Communication",
            "Problem Solving",
            "Negotiation",
            "Leadership",
            "Time Management",
            "Teamwork",
            "Analytical Thinking",
            "Customer Service",
          ].map((skill, i) => (
            <div key={i} className="mb-2">
              <p contentEditable className="mb-1">
                {skill}
              </p>
              <div className="h-2 bg-white/30 rounded">
                <div className="h-2 w-3/4 bg-white rounded" />
              </div>
            </div>
          ))}

          {/* SOFT SKILLS */}
          <h2 className="text-base font-semibold mt-7 mb-3">Soft Skills</h2>
          {[
            "Communication",
            "Problem-solving",
            "Adaptability",
            "Time management",
          ].map((skill, i) => (
            <div key={i} className="flex justify-between mb-2">
              <p contentEditable>{skill}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    className={`w-2.5 h-2.5 rounded-full ${
                      d <= 4 ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* LANGUAGES */}
          <h2 className="text-base font-semibold mt-7 mb-3">Languages</h2>
          <div className="flex gap-2">
            <span contentEditable className="bg-white/20 px-3 py-1 rounded">
              English
            </span>
            <span contentEditable className="bg-white/20 px-3 py-1 rounded">
              Hindi
            </span>
          </div>
        </div>

        {/* RIGHT CONTENT — UNCHANGED */}
        <div className="col-span-2 p-8">
          <div className="bg-gray-200 p-6 mb-6">
            <h1
              contentEditable
              className="text-3xl font-bold text-[#9C4A32]"
            >
              Ronald Reed
            </h1>
            <p contentEditable className="text-lg">
              Subcontractor
            </p>
          </div>

          <p contentEditable className="text-sm leading-relaxed mb-6">
            Experienced Subcontractor with 19 years of proven success in managing
            and executing a variety of construction projects. Demonstrated
            ability to deliver projects on time and within budget, while
            maintaining high quality standards. Skilled in coordinating
            subcontractors, suppliers, and client expectations to ensure
            seamless project completion.
          </p>

          <h2 className="text-lg font-semibold text-[#9C4A32] mb-4">
            Work Experience
          </h2>

          <div className="mb-5">
            <div className="flex justify-between text-sm font-semibold">
              <p contentEditable>Senior Subcontractor</p>
              <p contentEditable>Jan 2005 – Dec 2020</p>
            </div>
            <p contentEditable className="text-sm italic mb-2">
              Construction Co.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li contentEditable>
                Oversaw subcontracting operations for large-scale projects
              </li>
              <li contentEditable>
                Negotiated contracts with subcontractors and vendors
              </li>
              <li contentEditable>
                Managed timelines and budgets to meet expectations
              </li>
              <li contentEditable>
                Achieved a 95% completion rate
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-sm font-semibold">
              <p contentEditable>Junior Subcontractor</p>
              <p contentEditable>Mar 2012 – Present</p>
            </div>
            <p contentEditable className="text-sm italic mb-2">
              Building Solutions LLC
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li contentEditable>
                Assisted senior subcontractors in logistics and scheduling
              </li>
              <li contentEditable>Reviewed bids and proposals</li>
              <li contentEditable>Performed on-site inspections</li>
              <li contentEditable>Achieved 90% client satisfaction</li>
            </ul>
          </div>

          <h2 className="text-lg font-semibold text-[#9C4A32] mt-6 mb-4">
            Education
          </h2>

          <div className="mb-3">
            <div className="flex justify-between text-sm font-semibold">
              <p contentEditable>Masters in Civil Engineering</p>
              <p contentEditable>Sep 2002 – May 2006</p>
            </div>
            <p contentEditable className="text-sm italic">
              Stanford University
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold">
              <p contentEditable>Bachelors in Civil Engineering</p>
              <p contentEditable>Sep 1998 – May 2002</p>
            </div>
            <p contentEditable className="text-sm italic">
              University of California, Berkeley
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
