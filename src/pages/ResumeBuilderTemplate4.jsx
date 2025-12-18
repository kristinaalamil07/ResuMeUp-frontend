import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilderTemplate4() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState("https://via.placeholder.com/150");
  const navigate = useNavigate();

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-4");
    const canvas = await html2canvas(resume, { scale: 2 });
    const link = document.createElement("a");
    link.download = "resume-template-4.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-4");
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "in", "letter");
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save("resume-template-4.pdf");
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-3xl')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-lg')?.innerText || "No Job Title",
      template: "Template 4",
      data: {} // save more fields if needed
    };
    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));
    navigate("/profile"); // redirect after saving
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center py-10 font-sans">
      
      {/* FLOATING MENU */}
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

        {/* MAIN MENU */}
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
            <button onClick={saveAsPDF} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition">
              <span className="font-semibold text-[#3b2f1f]">Save as PDF</span>
            </button>
            <button onClick={saveAsPNG} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition">
              <span className="font-semibold text-[#3b2f1f]">Save as PNG</span>
            </button>
            <button onClick={() => setSubmenuOpen(false)} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#bfa77a] transition">
              <span className="font-semibold text-[#3b2f1f]">Back</span>
            </button>
          </div>
        )}
      </div>
      
      {/* RESUME */}
      <div
        id="resume-template-4"
        className="w-[816px] h-[1056px] bg-white shadow-lg grid grid-cols-5 text-[13px]"
      >
        {/* LEFT SIDE (mas konting bawas) */}
        <div className="col-span-3 p-10">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1
                contentEditable
                className="text-3xl font-bold text-[#8B5A2B]"
              >
                Aiden Kelly
              </h1>
              <p
                contentEditable
                className="text-lg text-[#F97316] font-semibold"
              >
                Work from Home
              </p>

              <div className="mt-3 space-y-1">
                <p contentEditable>📞 313.254.7849</p>
                <p contentEditable>🔗 simple-suspension.info</p>
              </div>
            </div>

            <div className="mt-8 space-y-1">
              <p contentEditable>✉️ aiden_kelly3@yahoo.com</p>
              <p contentEditable>📍 Casandrahaven, Colombia</p>
            </div>
          </div>

          {/* SUMMARY */}
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b-2 border-[#8B5A2B] mb-2">
              SUMMARY
            </h2>
            <p contentEditable className="leading-relaxed">
              Results-driven Insurance Agent with 3 years of experience in guiding
              individuals, families, and businesses towards financial strategies.
              Strong communication skills, attention to detail, and problem-solving
              abilities have consistently contributed to increased client
              satisfaction and exceeded sales targets. Proficient in utilizing
              technology platforms and software to streamline processes and enhance
              productivity. Bachelor's degree in Business Administration from the
              University of XYZ. Certified Financial Planner with expertise in
              insurance and investment strategies. Passionate about providing
              exceptional service and helping clients achieve their financial goals.
            </p>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h2 className="font-bold text-lg border-b-2 border-[#8B5A2B] mb-3">
              EXPERIENCE
            </h2>

            <div className="mb-5">
              <p
                className="font-bold text-[15px]"
                contentEditable
              >
                Insurance Agent
              </p>
              <p className="text-[#F97316] font-semibold" contentEditable>
                The Griffin Agency
              </p>
              <p className="italic" contentEditable>
                🗓 2022 – Ongoing | 📍 Location
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li contentEditable>
                  Guided individuals, families, and businesses towards the financial
                  strategy that best meets their needs.
                </li>
                <li contentEditable>
                  Developed and maintained strong relationships with clients
                  resulting in a 30% increase in client retention.
                </li>
                <li contentEditable>
                  Analyzed individual client’s financial situation and risk
                  tolerance resulting in a 20% increase in policy coverage.
                </li>
                <li contentEditable>
                  Utilized Google Drive and Excel resulting in a 15% reduction in
                  administrative errors.
                </li>
              </ul>
            </div>

            <div>
              <p
                className="font-bold text-[15px]"
                contentEditable
              >
                Business Manager
              </p>
              <p className="text-[#F97316] font-semibold" contentEditable>
                ABC Company
              </p>
              <p className="italic" contentEditable>
                🗓 2017 – 2022 | 📍 New York, NY
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li contentEditable>
                  Managed daily operations and implemented strategic initiatives.
                </li>
                <li contentEditable>
                  Led a team of 15 employees resulting in a 25% increase in revenue.
                </li>
                <li contentEditable>
                  Implemented cost-saving measures reducing expenses by 15%.
                </li>
                <li contentEditable>
                  Increased customer acquisition by 20%.
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE – MAS MALAPAD */}
        <div className="col-span-2 p-8 relative">
          {/* PROFILE PHOTO */}
          <div
            className="absolute top-8 right-8 w-32 h-32 rounded-full overflow-hidden cursor-pointer border-4 border-[#8B5A2B]"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <section className="mb-6 mt-40">
            <h2 className="font-bold text-base border-b-2 border-[#8B5A2B] mb-2">
              MY LIFE PHILOSOPHY
            </h2>
            <p
              contentEditable
              className="italic text-[#F97316]"
            >
              Success is not final, failure is not fatal: It is the courage to
              continue that counts.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-bold text-base border-b-2 border-[#8B5A2B] mb-3">
              STRENGTHS
            </h2>

            {[
              {
                title: "✔️ Effective Communicator",
                desc:
                  "Proven ability to communicate complex information clearly and concisely resulting in increased client satisfaction.",
              },
              {
                title: "🏅 Detail-Oriented",
                desc:
                  "Strong attention to detail ensuring accuracy in documentation and recommendations.",
              },
              {
                title: "🧠 Problem Solver",
                desc:
                  "Skilled at identifying client issues and resolving conflicts resulting in improved retention.",
              },
            ].map((item) => (
              <div key={item.title} className="mb-3">
                <p
                  contentEditable
                  className="font-semibold text-[15px] text-[#8B5A2B]"
                >
                  {item.title}
                </p>
                <p contentEditable>{item.desc}</p>
              </div>
            ))}
          </section>

          {/* SKILLS */}
          <section>
            <h2 className="font-bold text-base border-b-2 border-[#8B5A2B] mb-3">
              SKILLS
            </h2>

            <div className="grid grid-cols-2 gap-y-2">
              {[
                "Sales",
                "Communication",
                "Customer Service",
                "Problem Solving",
                "Relationship Building",
                "Analytical Skills",
                "Microsoft Excel",
                "Google Drive",
              ].map((skill) => (
                <p
                  key={skill}
                  contentEditable
                  className="border-b border-gray-400 w-fit"
                >
                  {skill}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


