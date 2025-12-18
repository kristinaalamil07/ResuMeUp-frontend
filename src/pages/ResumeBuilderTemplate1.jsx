import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate1() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-1");
    if (!resume) return;
    const canvas = await html2canvas(resume);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "resume1.png";
    link.click();
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-1");
    if (!resume) return;
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume1.pdf");
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-sm.text-gray-600')?.innerText || "No Job Title",
      template: "Template 1",
      data: {} // you can save more fields if needed
    };
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    navigate("/profile"); // redirect to Profile.jsx to show the draft
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center py-10" id="resume-template-1">
      
      {/* ================= MENU — FIXED & STYLED ================= */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* MENU BUTTON */}
        <button
          onClick={() => { setOpen(!open); setSubmenuOpen(false); }}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition hover:scale-105"
          style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6 text-[#3b2f1f]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* MAIN DROPDOWN */}
        {open && !submenuOpen && (
          <div
            className="absolute bottom-16 right-0 w-52 rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}
          >
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
          <div
            className="absolute bottom-16 right-0 w-52 rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}
          >
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
              onClick={() => { setSubmenuOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition"
            >
              <span className="font-semibold text-[#3b2f1f]">Back</span>
            </button>
          </div>
        )}
      </div>

      
      {/* RESUME */}
      <div
        id="resume-template-1"
        className="w-[816px] h-[1056px] bg-white text-black px-14 py-12 shadow-lg"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1
            contentEditable
            suppressContentEditableWarning
            className="text-[26px] font-bold tracking-wide"
          >
            MICHAEL ZLATKOVSKY
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            className="text-[13px] mt-2"
          >
            http://www.michaelzlat.com • michaelzlat@gmail.com • (812) 824-5373 •
            6405 S. Main St. • Bloomington, IN 47401
          </p>
        </div>

        {/* OBJECTIVE */}
        <section className="mb-5">
          <h2 className="font-bold border-b mb-1 text-[14px]">OBJECTIVE</h2>
          <p contentEditable className="text-[13px]">
            Obtain a full-time Software Development or Product Management role,
            utilizing my programming skills and leadership abilities.
          </p>
        </section>

        {/* EDUCATION */}
        <section className="mb-5">
          <h2 className="font-bold border-b mb-2 text-[14px]">
            EDUCATION & INTERNATIONAL EXPERIENCE
          </h2>

          <div className="mb-2">
            <div className="flex justify-between font-bold text-[13px]">
              <span contentEditable>Indiana University, Bloomington, IN</span>
              <span contentEditable>2009–2011</span>
            </div>
            <ul className="list-disc list-inside text-[13px]">
              <li contentEditable>
                Master of Science in Computer Science. 3.95 / 4.0 GPA.
              </li>
            </ul>
          </div>

          <div className="mb-2">
            <div className="flex justify-between font-bold text-[13px]">
              <span contentEditable>University of Evansville, Evansville, IN</span>
              <span contentEditable>2005–2009</span>
            </div>
            <ul className="list-disc list-inside text-[13px]">
              <li contentEditable>
                Bachelor of Science in Computer Science, Bachelor of Arts in
                Cognitive Science. 3.96 / 4.0 GPA.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-bold text-[13px]">
              <span contentEditable>
                Harlaxton College, Grantham, United Kingdom
              </span>
              <span contentEditable>Spring & Fall 2007</span>
            </div>
            <ul className="list-disc list-inside text-[13px]">
              <li contentEditable>
                Completed 26 credits during study abroad. 3.90 / 4.0 GPA.
              </li>
            </ul>
            <p contentEditable className="text-[13px] mt-1">
              Languages: Fluent in Russian, some knowledge of Hebrew.
            </p>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="mb-5">
          <h2 className="font-bold border-b mb-2 text-[14px]">
            WORK EXPERIENCE
          </h2>

          <div className="mb-3">
            <div className="flex justify-between font-bold text-[13px]">
              <span contentEditable>
                SmartTabs, Co-Founder & Software Architect, Cologne, Germany
                (telecommute)
              </span>
              <span contentEditable>2008–present</span>
            </div>
            <ul className="list-disc list-inside text-[13px]">
              <li contentEditable>
                Spearheaded all phases of product development from
                conceptualization to release.
              </li>
              <li contentEditable>
                Teleconferenced with colleagues to design new features and
                troubleshoot issues.
              </li>
              <li contentEditable>
                Wrote user manuals and administered company website.
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <div className="flex justify-between font-bold text-[13px]">
              <span contentEditable>
                Human-Robot Interaction Lab, Software Developer, Bloomington, IN
              </span>
              <span contentEditable>2009–2011</span>
            </div>
            <ul className="list-disc list-inside text-[13px]">
              <li contentEditable>
                Designed extensible visualization frameworks.
              </li>
              <li contentEditable>
                Developed multi-robot simulators and editing environments.
              </li>
              <li contentEditable>
                Collaborated on refactoring, testing, and documentation.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-bold text-[13px]">
              <span contentEditable>
                Virginia Polytechnic Institute, Undergraduate Researcher,
                Blacksburg, VA
              </span>
              <span contentEditable>Summer 2008</span>
            </div>
            <ul className="list-disc list-inside text-[13px]">
              <li contentEditable>
                Team-researched and demoed a prototype “universal input device”.
              </li>
            </ul>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="mb-5">
          <h2 className="font-bold border-b mb-2 text-[14px]">
            TECHNICAL SKILLS
          </h2>
          <ul className="list-disc list-inside text-[13px] space-y-1">
            <li contentEditable>
              Java: 3+ years including multi-threading, GUI interfaces, security.
            </li>
            <li contentEditable>
              C#, Visual Basic .NET: 3+ years developing Office add-ins.
            </li>
            <li contentEditable>
              IDEs: 3+ years using Visual Studio and Eclipse.
            </li>
            <li contentEditable>
              Version Control: 2 years intensive Subversion use.
            </li>
            <li contentEditable>
              Web Programming: PHP, SQL, HTML, CSS, XML.
            </li>
            <li contentEditable>
              Automated Testing & CI: JUnit, Bamboo, BuildBot.
            </li>
            <li contentEditable>
              Documentation: Wiki, LaTeX, Confluence, JIRA.
            </li>
            <li contentEditable>
              Operating Systems: Windows, Mac OS X, some Linux.
            </li>
          </ul>
        </section>

        {/* TEAM MANAGEMENT */}
        <section>
          <h2 className="font-bold border-b mb-2 text-[14px]">
            TEAM MANAGEMENT EXPERIENCE
          </h2>
          <p className="font-bold text-[13px]" contentEditable>
            Manager for “Fluency”, a UI Builder for Non-Programmers, Bloomington,
            IN — 2010
          </p>
          <ul className="list-disc list-inside text-[13px]">
            <li contentEditable>
              Managed five graduate students, set milestones, reviewed code, and
              oversaw team dynamics.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

 
