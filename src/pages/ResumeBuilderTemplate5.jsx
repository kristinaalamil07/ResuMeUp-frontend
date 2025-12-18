import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate5() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-5");
    const canvas = await html2canvas(resume, { scale: 2 });
    const link = document.createElement("a");
    link.download = "resume-template5.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-5");
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume-template-5.pdf");
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-sm')?.innerText || "No Job Title",
      template: "Template 5",
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
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition hover:scale-105"
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

      {/* RESUME TEMPLATE — FULL & UNTOUCHED */}
      <div
  id="resume-template-5"
  className="w-[816px] h-[1056px] bg-white shadow-lg grid grid-cols-3 font-sans"
      >
        {/* LEFT SIDEBAR */}
        <div className="bg-[#F6E3CF] p-6">
          <div className="space-y-2 text-sm text-gray-700">
            <p contentEditable suppressContentEditableWarning>📞 +91 98765 43210</p>
            <p contentEditable suppressContentEditableWarning>
              ✉️ arvind.malhotra@example.com
            </p>
            <p contentEditable suppressContentEditableWarning>
              📍 Pune, Maharashtra 411001
            </p>
            <p contentEditable suppressContentEditableWarning>
              🎂 12 March 1986
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-sm tracking-wide mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700 leading-relaxed"
            >
              Bringing expertise in financial planning, project coordination, and
              risk assessment, with a strong focus on stakeholder management and
              process improvement initiatives. Experienced in developing
              financial models and dashboards to support strategic decisions and
              reporting enhancements. Skilled in fostering collaboration across
              finance, IT, and operations teams.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-sm tracking-wide mb-4">SKILLS</h2>
            <div className="flex flex-col gap-3">
              {[
                "Financial Planning & Budgeting",
                "Project Coordination & Delivery",
                "Risk Assessment & Compliance",
                "Financial Reporting & Analysis",
                "Forecasting & Cost Control",
                "Stakeholder & Vendor Management",
                "Process Improvement Initiatives",
              ].map((skill, i) => (
                <span
                  key={i}
                  contentEditable
                  suppressContentEditableWarning
                  className="border border-orange-300 rounded-full px-4 py-1 text-xs w-fit"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-sm tracking-wide mb-3">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li contentEditable suppressContentEditableWarning>
                Certified Financial Planner (CFP)
              </li>
              <li contentEditable suppressContentEditableWarning>
                Project Management Professional (PMP)
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-sm tracking-wide mb-3">REFERENCES</h2>
            <p contentEditable suppressContentEditableWarning className="text-sm">
              References available upon request
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT — FULLY RESTORED */}
        <div className="col-span-2 p-8">
          <div className="mb-8">
            <h1
              contentEditable
              suppressContentEditableWarning
              className="text-3xl font-bold text-orange-500"
            >
              ARVIND MALHOTRA
            </h1>
            <p
              contentEditable
              suppressContentEditableWarning
              className="text-lg font-semibold text-gray-700"
            >
              Financial Project Manager
            </p>
          </div>

          <section className="mb-8">
            <h2 className="font-bold text-sm tracking-wide mb-4">EXPERIENCE</h2>

            <div className="mb-5">
              <div className="flex justify-between text-sm font-semibold">
                <p contentEditable suppressContentEditableWarning>
                  Senior Financial Project Manager
                </p>
                <p contentEditable suppressContentEditableWarning className="text-gray-600">
                  May 2019 – Present
                </p>
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm italic text-gray-600"
              >
                Axis Capital Finance Ltd., Pune, Maharashtra
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                <li contentEditable suppressContentEditableWarning>
                  Led multiple financial transformation projects involving
                  budgeting, systems upgrades, and reporting improvements.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Collaborated with finance, IT, and operations teams.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Developed financial models and dashboards.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Ensured compliance with financial policies.
                </li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-sm font-semibold">
                <p contentEditable suppressContentEditableWarning>
                  Financial Project Manager
                </p>
                <p contentEditable suppressContentEditableWarning className="text-gray-600">
                  Apr 2015 – Apr 2019
                </p>
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm italic text-gray-600"
              >
                FinBridge Investment Services, Mumbai
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                <li contentEditable suppressContentEditableWarning>
                  Managed cost optimisation projects.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Coordinated timelines and stakeholders.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Prepared financial reports and analyses.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Improved reporting efficiency by 20%.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold">
                <p contentEditable suppressContentEditableWarning>
                  Financial Analyst
                </p>
                <p contentEditable suppressContentEditableWarning className="text-gray-600">
                  Mar 2011 – Mar 2015
                </p>
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm italic text-gray-600"
              >
                HDFC Securities, Bengaluru
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                <li contentEditable suppressContentEditableWarning>
                  Supported project budgeting and evaluations.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Analysed financial data for management.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Reviewed investment proposals.
                </li>
                <li contentEditable suppressContentEditableWarning>
                  Prepared compliance reports.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-sm tracking-wide mb-4">EDUCATION</h2>

            <div className="mb-3">
              <div className="flex justify-between text-sm font-semibold">
                <p contentEditable suppressContentEditableWarning>
                  MBA in Finance
                </p>
                <p contentEditable suppressContentEditableWarning className="text-gray-600">
                  Jan 2011
                </p>
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm italic text-gray-600"
              >
                Christ University
              </p>
            </div>

            <div className="mb-3">
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm font-semibold"
              >
                Bachelor of Commerce (B.Com) in Finance Specialisation
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm italic text-gray-600"
              >
                St. Xavier’s College
              </p>
            </div>

            <div>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm font-semibold"
              >
                Higher Secondary School in Commerce
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-sm italic text-gray-600"
              >
                Kendriya Vidyalaya
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}