import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate9() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const [skills, setSkills] = useState([
    { name: "Childcare", level: 4 },
    { name: "Cooking", level: 3 },
    { name: "First Aid", level: 4 },
    { name: "Communication", level: 5 },
    { name: "Time Management", level: 4 },
  ]);

  const [softSkills, setSoftSkills] = useState([
    { name: "Patience", level: 4 },
    { name: "Adaptability", level: 3 },
    { name: "Organization", level: 4 },
    { name: "Empathy", level: 5 },
  ]);

  /* PHOTO */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  /* UPDATE SKILLS */
  const updateSkillLevel = (index, level) => {
    const updated = [...skills];
    updated[index].level = level;
    setSkills(updated);
  };
  const updateSoftSkill = (index, level) => {
    const updated = [...softSkills];
    updated[index].level = level;
    setSoftSkills(updated);
  };

  /* EXPORT FUNCTIONS */
  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-9");
    if (!resume) return;
    const canvas = await html2canvas(resume, { scale: 2 });
    const link = document.createElement("a");
    link.download = "resume-template-9.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setSubmenuOpen(false);
    setMenuOpen(false);
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-9");
    if (!resume) return;
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "in", "letter");
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save("resume-template-9.pdf");
    setSubmenuOpen(false);
    setMenuOpen(false);
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-gray-600')?.innerText || "No Job Title",
      template: "Template 9",
      data: {} // save more fields if needed
    };
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    navigate("/profile"); // redirect to Profile.jsx
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

      {/* RESUME TEMPLATE */}
      <div id="resume-template-9" className="w-[816px] h-[1056px] bg-white shadow-lg flex font-sans">
        {/* LEFT COLUMN */}
        <div className="w-[68%] px-10 py-10">
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <label className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden cursor-pointer flex items-center justify-center">
              {photo ? (
                <img src={photo} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-600 text-center">
                  
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>

            <div>
              <h1 contentEditable className="text-3xl font-bold">
                Kenneth Moore
              </h1>
              <p contentEditable className="text-gray-600">
                Professional Nanny
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <section className="mb-6">
            <h2 className="text-teal-700 font-bold border-b pb-1 mb-2">
              Professional Summary
            </h2>
            <p contentEditable className="text-sm leading-relaxed">
              Experienced and dedicated Professional Nanny with 5 years of proven
              expertise in providing top-notch childcare services. Skilled in
              creating nurturing environments, planning educational activities,
              and ensuring the safety and well-being of children. Committed to
              fostering positive relationships with families and supporting child
              development. Recognized for reliability, patience, and excellent
              communication skills. 
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-6">
            <h2 className="text-teal-700 font-bold border-b pb-1 mb-2">
              Work Experience
            </h2>

            <div className="mb-4">
              <div className="flex justify-between font-semibold text-sm">
                <span contentEditable>Professional Nanny – Level 1</span>
                <span contentEditable>Jun 2016 – May 2018</span>
              </div>
              <p contentEditable className="text-sm">
                Happy Kids Daycare
              </p>
              <ul className="list-disc list-inside text-sm mt-1">
                <li contentEditable>
                  Cared for children aged 6 months to 3 years old
                </li>
                <li contentEditable>
                  Planned and implemented educational activities
                </li>
                <li contentEditable>
                  Prepared nutritious meals and snacks
                </li>
                <li contentEditable>
                  Provided a safe and nurturing environment
                </li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between font-semibold text-sm">
                <span contentEditable>Professional Nanny – Level 2</span>
                <span contentEditable>Jul 2018 – Present</span>
              </div>
              <p contentEditable className="text-sm">Little Angels Family Care</p>
              <ul className="list-disc list-inside text-sm mt-1">
                <li contentEditable>Managed household with multiple children of varying ages.</li>
                <li contentEditable>Organized and supervised playdates and outings.</li>
                <li contentEditable>Assisted with homework and school projects</li>
                <li contentEditable>Maintained open communication with parents regarding children's
                  development</li>
                <li contentEditable>Implemented behavior management techniques to promote positive
                  behavior</li>
              </ul>
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-teal-700 font-bold border-b pb-1 mb-2">
              Education
            </h2>

            <div className="mb-3">
              <div className="flex justify-between font-semibold text-sm">
                <span contentEditable>Masters in Early Childhood Education</span>
                <span contentEditable>2013 – 2015</span>
              </div>
              <p contentEditable className="text-sm">ABC University</p>
              <p contentEditable className="text-sm">Focused on child development theories, curriculum design, and family engagement strategies.</p>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-sm">
                <span contentEditable>Bachelors in Child Development</span>
                <span contentEditable>2009 – 2013</span>
              </div>
              <p contentEditable className="text-sm">XYZ College</p>
              <p contentEditable className="text-sm">Studied child psychology, nutrition, and early learning principles.</p>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-[32%] bg-teal-700 text-white px-6 py-10">
          {/* CONTACT */}
          <section className="mb-6">
            <h2 className="font-bold + border-b border-dotted pb-1 mb-2">
              Contact Details
            </h2>
            <p contentEditable className="text-sm">info@maxresumes.com</p>
            <p contentEditable className="text-sm">+91 46110 92878</p>
            <p contentEditable className="text-sm">Bangalore, India</p>
            <p contentEditable className="text-sm">linkedin.com/in/name</p>
          </section>

          {/* SKILLS WITH EDITABLE BARS */}
          <section className="mb-6">
            <h2 className="font-bold + border-b border-dotted pb-1 mb-2">
              Skills
            </h2>

            {skills.map((skill, i) => (
              <div key={i} className="mb-3">
                <p contentEditable className="text-sm mb-1">
                  {skill.name}
                </p>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      onClick={() => updateSkillLevel(i, lvl)}
                      className={`h-2 flex-1 ${
                        lvl <= skill.level ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
          {/* SOFT SKILLS — COMPLETE DOTS */}
          <section className="mb-6">
            <h2 className="font-bold border-b border-dotted pb-1 mb-3">
              Soft Skills
            </h2>

            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2 text-sm"
              >
                <span>{skill.name}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      onClick={() => updateSoftSkill(index, dot)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                        dot <= skill.level ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
          {/* LANGUAGES */}
          <section>
            <h2 className="font-bold + border-b border-dotted pb-1 mb-2">
              Languages
            </h2>
            <span
              contentEditable
              className="inline-block bg-white text-teal-700 text-xs px-2 py-1 rounded mr-2"
            >
              English
            </span>
            <span
              contentEditable
              className="inline-block bg-white text-teal-700 text-xs px-2 py-1 rounded"
            >
              Hindi
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}