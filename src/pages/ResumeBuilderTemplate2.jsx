import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate2() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-2");
    if (!resume) return;
    const canvas = await html2canvas(resume);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "resume2.png";
    link.click();
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-2");
    if (!resume) return;
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume2.pdf");
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-sm.text-gray-600')?.innerText || "No Job Title",
      template: "Template 2",
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
        id="resume-template-2"
        className="w-[816px] h-[1056px] bg-white shadow-lg grid grid-cols-[38%_62%]"
      >
{/* LEFT SIDE */}
<div className="h-full px-4">
  {/* GRAY PANEL */}
  <div className="bg-gray-200 h-full px-6 py-10">
    
    {/* PHOTO */}
    <div className="flex justify-center mb-6">
      <div
        onClick={() => fileInputRef.current.click()}
        className="w-36 h-36 rounded-full overflow-hidden bg-gray-300 cursor-pointer"
      >
        {photo ? (
          <img src={photo} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
            Upload Photo
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>
    </div>


    {/* ABOUT ME */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">
        About Me
      </h2>
      <p
        contentEditable
        className="text-sm text-justify leading-relaxed text-gray-700"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        pharetra in lorem at laoreet. Donec hendrerit libero eget est
        tempor, quis tempus arcu elementum. Donec hendrerit libero
        eget est tempor, quis tempus arcu elementum. In elementum
        elit at dui tristique feugiat. Donec hendrerit libero
        eget est tempor, quis tempus arcu elementum. In elementum
        elit at dui tristique feugiat.
      </p>
    </section>

    {/* SKILLS */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">
        Skills
      </h2>
      <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
        <li contentEditable>Web Design</li>
        <li contentEditable>Branding</li>
        <li contentEditable>Graphic Design</li>
        <li contentEditable>SEO</li>
        <li contentEditable>Marketing</li>
      </ul>
    </section>

{/* REWARD */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">
        Reward
      </h2>
        <p contentEditable className="text-sm text-gray-700">Oct 2019 | Licera & Co.</p>
        <p contentEditable className="text-[12px] text-gray-700">The Best Employee of the Year</p>
        <p contentEditable className="text-[12px] text-gray-700"></p>
        <p contentEditable className="text-sm text-gray-700">May 2017 | Licera & Co.</p>
        <p contentEditable className="text-[12px] text-gray-700">The Best Employee of the Year</p>
    </section>
    
    {/* LANGUAGES */}
    <section>
      <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">
        Languages
      </h2>
      <p contentEditable className="text-sm text-gray-700">English</p>
      <p contentEditable className="text-sm text-gray-700">French</p>
      <p contentEditable className="text-sm text-gray-700"></p>

    </section>

  </div>
</div>
        {/* RIGHT SIDE */}
        <div className="px-10 py-10">
          {/* HEADER */}
          <div className="mb-8">
            <h1
              contentEditable
              className="text-[26px] tracking-wide font-medium text-gray-800"
            >
              LORNA ALVARADO
            </h1>
            <p contentEditable className="text-[13px] font-bold text-gray-800">
              Digital Marketing Specialist
            </p>

            <div className="grid grid-cols-3 gap-6 mt-5 text-[12px]">
              <div>
                <p className="font-sm">Phone</p>
                <p contentEditable>+123-456-7890</p>
              </div>
              <div>
                <p className="font-sm">Email</p>
                <p contentEditable>hello@reallygreatsite.com</p>
              </div>
              <div>
                <p className="font-sm">Address</p>
                <p contentEditable>123 Anywhere St., Any City</p>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <section>
      <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">
        Experience
      </h2>

            {[
              ["Social Media Manager", "2019 - 2022"],
              ["Digital Marketing Manager", "2017 - 2019"],
              ["Digital Marketing Manager", "2015 - 2017"],
            ].map((item, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between text-14px font-medium">
                  <span contentEditable>{item[0]}</span>
                  <span contentEditable>{item[1]}</span>
                </div>
                <p contentEditable className="italic text-[smpx]">
                  Larana Inc, Branding
                </p>
                <p contentEditable className="text-[13px] leading-relaxed mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                  eget est tempor, quis tempus arcu elementum. In elementum
                  elit at dui tristique feugiat.
                </p>
              </div>
            ))}
          </section>

          {/* EDUCATION */}
           <section>
      <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">
        Education
        
      </h2>

            {[
              ["2011 - 2014"],
              ["2008 - 2012"],
            ].map((year, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between text-sm font-medium">
                  <span contentEditable>
                    Master Of Marketing and Business
                  </span>
                  <span contentEditable>{year}</span>
                </div>
                <p contentEditable className="italic text-[13px]">
                  Fauget University
                </p>
                <p contentEditable className="text-[13px] leading-relaxed mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                  eget est tempor, quis tempus arcu elementum. 
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}