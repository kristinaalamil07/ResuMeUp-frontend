import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate8() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-8");
    if (!resume) return;
    const canvas = await html2canvas(resume);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "resume-template-8.png";
    link.click();
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-8");
    if (!resume) return;
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume-template-8.pdf");
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-sm.text-gray-600')?.innerText || "No Job Title",
      template: "Template 8",
      data: {} // you can save more fields if needed
    };
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    navigate("/profile"); // redirect to Profile.jsx to show the draft
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center py-10" id="resume-template-8">
      
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

      {/* 

      {/* PAGE */}
      <div className="w-[900px] bg-white grid grid-cols-[320px_1fr] shadow-lg">

        {/* ================= LEFT SIDEBAR ================= */}
        <div className="bg-[#4a4a4a] text-white px-8 py-10">
          {/* PHOTO */}
          <div className="flex justify-center mb-8">
            <div className="w-36 h-36 rounded-full bg-gray-300 border-4 border-gray-300 overflow-hidden">
              <img
                src="/template8-profile.png"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ABOUT */}
          <section className="mb-8">
            <h2 className="uppercase font-semibold text-sm tracking-wide border-b border-gray-500 pb-2 mb-3">
              Tentang Saya
            </h2>
            <p
              contentEditable
              className="text-[13px] leading-relaxed text-justify text-gray-200"
            >
              Pengarah Kreatif dengan pengalaman lebih dari 10 tahun dalam
              industri animasi dan reka bentuk grafik. Mempunyai rekod yang
              terbukti dalam menghasilkan karya yang berkualiti dan memenangi
              anugerah. Berdedikasi untuk membawa visi kreatif ke realiti.
            </p>
          </section>

          {/* LINKS */}
          <section className="mb-8">
            <h2 className="uppercase font-semibold text-sm tracking-wide border-b border-gray-500 pb-2 mb-3">
              Pautan
            </h2>
            <p contentEditable className="text-[13px] text-gray-200 mb-2">
              <span className="font-semibold">LinkedIn:</span><br />
              www.linkedin.com/in/encikmimpi
            </p>
            <p contentEditable className="text-[13px] text-gray-200">
              <span className="font-semibold">Twitter:</span><br />
              www.twitter.com/encikmimpi
            </p>
          </section>

          {/* REFERENCES */}
          <section className="mb-8">
            <h2 className="uppercase font-semibold text-sm tracking-wide border-b border-gray-500 pb-2 mb-3">
              Rujukan
            </h2>

            <p contentEditable className="text-[13px] mb-4 text-gray-200">
              <span className="font-semibold">MR. JOHN DOE</span><br />
              DreamWorks Animation<br />
              T: +60109876543<br />
              E: johndoe@dreamworks.com
            </p>

            <p contentEditable className="text-[13px] text-gray-200">
              <span className="font-semibold">MS. JANE DOE</span><br />
              Pixar Animation Studios<br />
              T: +60109876544<br />
              E: janedoe@pixar.com
            </p>
          </section>

          {/* HOBBIES */}
          <section>
            <h2 className="uppercase font-semibold text-sm tracking-wide border-b border-gray-500 pb-2 mb-3">
              Hobi
            </h2>
            <ul className="list-disc list-inside text-[13px] text-gray-200 space-y-1">
              <li contentEditable>Melukis</li>
              <li contentEditable>Membaca Komik</li>
              <li contentEditable>Menonton Filem Animasi</li>
              <li contentEditable>Mendaki</li>
              <li contentEditable>Fotografi</li>
            </ul>
          </section>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="px-10 py-10 text-gray-800">

{/* HEADER */}
<div className="flex justify-between items-start mb-10">
  {/* NAME */}
  <div>
    <h1
      contentEditable
      className="text-3xl font-bold tracking-wide"
    >
      ERICK 
    </h1>
    <h1
      contentEditable
      className="text-3xl font-bold tracking-wide"
    >
      MEMPI
    </h1>
    <p
      contentEditable
      className="text-sm text-gray-600 mt-1"
    >
      Posisi / Jabatan
    </p>
  </div>

  {/* CONTACT INFO – UPPER RIGHT */}
  <div className="text-sm space-y-1 text-right">
    {/* ADDRESS */}
    <div className="flex items-center justify-end gap-2">
      <svg
        className="w-4 h-4 text-gray-700"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
      </svg>
      <span contentEditable>Jakarta, Indonesia</span>
    </div>

    {/* PHONE */}
    <div className="flex items-center justify-end gap-2">
      <svg
        className="w-4 h-4 text-gray-700"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
      <span contentEditable>+62 812 3456 7890</span>
    </div>

    {/* EMAIL */}
    <div className="flex items-center justify-end gap-2">
      <svg
        className="w-4 h-4 text-gray-700"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
      <span contentEditable>email@email.com</span>
    </div>
  </div>
</div>

{/* PENGALAMAN KERJA */}
<section className="mt-8">
  <h2 className="text-sm font-bold tracking-widest border-b pb-2 mb-6">
    PENGALAMAN KERJA
  </h2>

  <div className="grid grid-cols-[40%_20px_1fr] gap-x-6 relative">
    
    {/* LEFT */}
    <div>
      <p className="font-bold text-sm">DREAMWORKS ANIMATION</p>
      <p className="text-xs text-gray-500">Kuala Lumpur</p>
      <p className="text-xs text-gray-500">Jan 2015 - Dis 2021</p>
    </div>

    {/* TIMELINE */}
    <div className="relative flex justify-center">
      {/* vertical line */}
      <div className="absolute top-2 bottom-0 w-[2px] bg-gray-950"></div>

      {/* dot */}
      <div className="relative z-10 mt-1 w-3 h-3 bg-gray-700 rounded-full"></div>
    </div>

    {/* RIGHT */}
    <div>
      <p className="font-bold text-sm mb-1">Pengarah Kreatif</p>
      <ul className="list-disc pl-4 text-sm space-y-1">
        <li contentEditable>Mengarahkan dan mengawasi proses kreatif dan artistik</li>
        <li contentEditable>Mengembangkan konsep dan idea baru</li>
        <li contentEditable>Mengawasi produksi dan pasca produksi</li>
        <li contentEditable>Memastikan kualiti dan standard kerja</li>
      </ul>
    </div>
  </div>
<div className="grid grid-cols-[40%_20px_1fr] gap-x-6 relative mt-8">
  <div>
    <p className="font-bold text-sm">PIXAR ANIMATION STUDIOS</p>
    <p className="text-xs text-gray-500">Kuala Lumpur</p>
    <p className="text-xs text-gray-500">Jan 2010 - Dis 2014</p>
  </div>

  <div className="relative flex justify-center">
      <div className="absolute top-2 bottom-0 w-[2px] bg-gray-950"></div>
    <div className="relative z-10 mt-1 w-3 h-3 bg-gray-700 rounded-full"></div>
  </div>

  <div>
    <p className="font-bold text-sm mb-1">Pereka Grafik</p>
    <ul className="list-disc pl-4 text-sm space-y-1">
      <li contentEditable>Mereka bentuk grafik dan animasi</li>
      <li contentEditable>Menghasilkan konsep visual</li>
      <li contentEditable>Menyelaraskan dengan pasukan produksi</li>
    </ul>
  </div>
</div>
</section>

{/* EDUCATION */}
<section className="mt-8">
  <h2 className="text-sm font-bold tracking-widest border-b pb-2 mb-6">
    PENDIDIKAN
  </h2>

  <div className="grid grid-cols-[40%_20px_1fr] gap-x-6 relative">
    
    {/* LEFT */}
    <div>
      <p className="font-bold text-sm">UNIVERSITI MALAYA</p>
      <p className="text-xs text-gray-500">Kuala Lumpur</p>
      <p className="text-xs text-gray-500">2009</p>
    </div>

    {/* TIMELINE */}
    <div className="relative flex justify-center">
      {/* vertical line */}
      <div className="absolute top-2 bottom-0 w-[2px] bg-gray-950"></div>

      {/* dot */}
      <div className="relative z-10 mt-1 w-3 h-3 bg-gray-700 rounded-full"></div>
    </div>

    {/* RIGHT */}
    <div>
      <p className="font-bold text-sm mb-1">Ijazah Sarjana Muda Seni Visual</p>
      <ul className="list-disc pl-4 text-sm space-y-1">
        <li contentEditable>Fokus animasi dan reka bentuk grafik</li>
        <li contentEditable>Projek akhir animasi 3D</li>
      </ul>
    </div>
  </div>
<div className="grid grid-cols-[40%_20px_1fr] gap-x-6 relative mt-8">
  <div>
    <p className="font-bold text-sm">POLITEKNIK SHAH ALAM</p>
    <p className="text-xs text-gray-500">Shah Alam</p>
    <p className="text-xs text-gray-500">2019</p>
  </div>

  <div className="relative flex justify-center">
      <div className="absolute top-2 bottom-0 w-[2px] bg-gray-950"></div>
    <div className="relative z-10 mt-1 w-3 h-3 bg-gray-700 rounded-full"></div>
  </div>

  <div>
    <p className="font-bold text-sm mb-1">Diploma Seni Kreatif</p>
    <ul className="list-disc pl-4 text-sm space-y-1">
      <li contentEditable>Asas reka bentuk dan seni visual</li>
      <li contentEditable>Portfolio seni komprehensif</li>
    </ul>
  </div>
</div>
</section>

          {/* SKILLS */}
          <section className="mb-10">
            <h2 className="uppercase font-semibold tracking-wide border-b pb-2 mb-6">
              Kemahiran
            </h2>

            <div className="grid grid-cols-2 gap-6 text-[13px]">
              {[
                "Adobe Photoshop",
                "Adobe Illustrator",
                "Pengurusan Projek",
                "Pemikiran Kreatif",
                "Kemahiran Komunikasi",
                "Penyelesaian Masalah",
              ].map((skill) => (
                <div key={skill}>
                  <p contentEditable className="mb-1 font-semibold">
                    {skill}
                  </p>
                  <div className="w-full h-[6px] bg-gray-300">
                    <div className="h-full bg-gray-700 w-[85%]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LANGUAGE */}
          <section>
            <h2 className="uppercase font-semibold tracking-wide border-b pb-2 mb-6">
              Bahasa
            </h2>

            <div className="grid grid-cols-2 gap-6 text-[13px]">
              {[
                ["Bahasa Melayu", "90%"],
                ["Bahasa Inggeris", "80%"],
                ["Bahasa Mandarin", "60%"],
              ].map(([lang, level]) => (
                <div key={lang}>
                  <p contentEditable className="mb-1 font-semibold">
                    {lang}
                  </p>
                  <div className="w-full h-[6px] bg-gray-300">
                    <div className="h-full bg-gray-700" style={{ width: level }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
    
  );
}