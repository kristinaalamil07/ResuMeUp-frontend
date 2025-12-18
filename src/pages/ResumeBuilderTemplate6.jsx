import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate6() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-6");
    const canvas = await html2canvas(resume, { scale: 2 });
    const link = document.createElement("a");
    link.download = "resume-template-6.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-6");
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "in", "letter");
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save("resume-template-6.pdf");
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-xl')?.innerText || "No Job Title",
      template: "Template 6",
      data: {} // save more fields if needed
    };
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    navigate("/profile"); // redirect to Profile.jsx
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center py-10 font-sans">

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
        id="resume-template-6"
        className="w-[816px] h-[1056px] bg-white text-black px-14 py-12 shadow-lg"
      >
        {/* HEADER */}
        <div className="flex justify-between mb-12">
          <h1
            contentEditable
            suppressContentEditableWarning
            className="text-3xl font-medium"
          >
            John Doe
          </h1>
          <h2
            contentEditable
            suppressContentEditableWarning
            className="text-xl"
          >
            Mechanical Engineer
          </h2>
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-[160px_1fr_1fr] gap-6 text-sm mb-4">
          <div className="font-semibold">CONTACT</div>
          <div>
            <p contentEditable>Phone: +123-456-7890</p>
            <p contentEditable>Email: hello@reallygreatsite.com</p>
          </div>
          <div>
            <p contentEditable>
              Address: 123 Anywhere St., Any City, ST 12345
            </p>
            <p contentEditable>Portfolio: www.reallygreatsite.com</p>
          </div>
        </div>
        <hr className="mb-6" />

        {/* PROFESSIONAL EXPERIENCE */}
        <div className="grid grid-cols-[160px_1fr_1fr] gap-6 text-sm mb-6">
          <div className="font-semibold">PROFESSIONAL EXPERIENCE</div>
          <div className="col-span-2">
            <p className="font-semibold" contentEditable>
              Research and Development Engineer | 2030–2035
            </p>
            <p className="italic mb-2" contentEditable>
              The Innovation Lab
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li contentEditable>
                Spearheaded the development of advanced materials, resulting in a
                15% increase in product efficiency
              </li>
              <li contentEditable>
                Conducted comprehensive experiments and data analysis, leading
                to three published journal papers
              </li>
              <li contentEditable>
                Collaborated with cross-functional teams to ideate and prototype
                innovative solutions
              </li>
            </ul>

            <p className="font-semibold" contentEditable>
              Mechanical Engineer | 2027–2030
            </p>
            <p className="italic mb-2" contentEditable>
              Science and Tech Co.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li contentEditable>
                Assisted in optimizing mechanical systems, improving production
                speed by 20%
              </li>
              <li contentEditable>
                Drafted and implemented quality control procedures, reducing
                defects by 30%
              </li>
              <li contentEditable>
                Supported project documentation for senior stakeholders
              </li>
            </ul>
          </div>
        </div>
        <hr className="mb-6" />

        {/* EDUCATION */}
        <div className="grid grid-cols-[160px_1fr_1fr] gap-6 text-sm mb-6">
          <div className="font-semibold">EDUCATION</div>
          <div className="col-span-2">
            <p className="font-semibold" contentEditable>
              North State University | 2025–2027
            </p>
            <p contentEditable>
              Master of Science in Mechanical Engineering
            </p>
            <ul className="list-disc list-inside mb-4">
              <li contentEditable>GPA: 3.8</li>
              <li contentEditable>Best Thesis Awardee</li>
              <li contentEditable>
                Recognition for Extended Research Paper
              </li>
            </ul>

            <p className="font-semibold" contentEditable>
              South City College | 2021–2025
            </p>
            <p contentEditable>
              Bachelor of Science in Mechanical Engineering
            </p>
            <ul className="list-disc list-inside">
              <li contentEditable>GPA: 3.8</li>
              <li contentEditable>Editor-in-Chief, SCC Newsletter</li>
              <li contentEditable>
                President, The Innovation Society
              </li>
            </ul>
          </div>
        </div>
        <hr className="mb-6" />

        {/* CERTIFICATES */}
        <div className="grid grid-cols-[160px_1fr_1fr] gap-6 text-sm">
          <div className="font-semibold">CERTIFICATES</div>
          <div>
            <p contentEditable>Project Management | 2027</p>
            <p contentEditable>The Project Management Institute</p>
            <p contentEditable className="mt-2">
              Risk Management and Mitigation | 2028
            </p>
            <p contentEditable>Internal Auditors Team</p>
          </div>
          <div>
            <p contentEditable>System Optimization | 2028</p>
            <p contentEditable>Scrum Learning Society</p>
            <p contentEditable className="mt-2">
              Vendor Relations | 2030
            </p>
            <p contentEditable>South City College</p>
          </div>
        </div>
      </div>
    </div>
  );
}