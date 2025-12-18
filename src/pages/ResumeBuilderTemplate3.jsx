import { useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumeBuilderTemplate3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const saveAsDraft = () => {
    const resumeData = {
      name: document.querySelector('[contenteditable].text-[30px]')?.innerText || "No Name",
      jobTitle: document.querySelector('[contenteditable].text-blue-500')?.innerText || "No Job Title",
      template: "Template 3",
    };

    const drafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    drafts.push({ id: Date.now(), ...resumeData });
    localStorage.setItem("savedDrafts", JSON.stringify(drafts));

    navigate("/profile"); // go to profile immediately
  };

  const saveAsPDF = async () => {
    const resume = document.getElementById("resume-template-3");
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "in", "letter");
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save("resume-template-3.pdf");
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  const saveAsPNG = async () => {
    const resume = document.getElementById("resume-template-3");
    const canvas = await html2canvas(resume, { scale: 2 });
    const link = document.createElement("a");
    link.download = "resume-template-3.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setMenuOpen(false);
    setSubmenuOpen(false);
  };
  const [skills, setSkills] = useState([
    { name: "SEO", level: 90 },
    { name: "Public Speaking", level: 85 },
    { name: "Negotiation", level: 80 },
    { name: "Teamwork", level: 88 },
    { name: "Decision Making", level: 82 },
    { name: "Research & Strategy", level: 78 },
    { name: "Emotional Intelligence", level: 75 },
    { name: "Outbound Marketing", level: 85 },
    { name: "Email Marketing", level: 70 },
    { name: "Google Analytics", level: 65 },
    { name: "Sales & Marketing", level: 90 },
  ]);

  const [languages, setLanguages] = useState([
    { name: "English", level: 5 },
    { name: "Spanish", level: 4 },
    { name: "French", level: 3 },
  ]);

  return (
    <>
      <div className="flex justify-center bg-white-300 py-10">
        <div className="w-[816px] h-[1056px] bg-white p-8 font-sans text-gray-800">

          {/* ================= HEADER ================= */}
          <div className="relative flex justify-between border-b-2 border-blue-500 pb-5">

            <div className="absolute left-0 top-2 h-[50px] w-[5px] bg-gray-900" />

            <div className="pl-4 max-w-[320px]">
              <h1 contentEditable suppressContentEditableWarning className="text-[30px] font-bold">
                John Doe
              </h1>

              <p contentEditable suppressContentEditableWarning className="text-blue-500 font-medium text-[15px]">
                Business Development Manager
              </p>

              <p contentEditable suppressContentEditableWarning className="text-[14px] text-justify mt-3">
                Professional Business Development Manager with over four years of
                experience in identifying growth opportunities, developing
                strategic partnerships, managing sales pipelines, and driving
                revenue through data-driven decision making and leadership.
              </p>
            </div>

            <div className="mt-1 -ml-20">
              <div
                contentEditable
                suppressContentEditableWarning
                className="w-[120px] h-[120px] rounded-full border-[4px] border-blue-500 flex items-center justify-center text-[11px] text-gray-400"
              >
                PHOTO
              </div>
            </div>

            <div className="text-[12px] space-y-2 text-right">
              <ContactItem icon="email" text="john.doe@gmail.com" />
              <ContactItem icon="phone" text="202-555-0166" />
              <ContactItem icon="location" text="New York, USA" />
              <p contentEditable suppressContentEditableWarning>linkedin.com/in/johndoe</p>
              <p contentEditable suppressContentEditableWarning>@johndoe</p>
            </div>
          </div>

          {/* ================= BODY ================= */}
          <div className="grid grid-cols-5 gap-8 mt-6">

            <div className="col-span-3 space-y-7">
              <Section title="WORK EXPERIENCE" accent>
                <Experience
                  title="Business Development Manager"
                  company="AirState Solutions"
                  date="09/2014 – 06/2017"
                  location="New York, USA"
                  bullets={[
                    "Managed high-value projects with budgets ranging from $2–3 million, consistently meeting deadlines and performance goals.",
                    "Developed and implemented long-term sales and marketing strategies that increased company revenue and market reach.",
                    "Improved customer satisfaction from 81% to 95% by analyzing feedback and optimizing service processes.",
                    "Built strong client relationships that resulted in long-term contracts and repeat business.",
                  ]}
                />

                <Experience
                  title="Business Development Assistant"
                  company="AirState Solutions"
                  date="08/2012 – 09/2014"
                  location="Chicago, USA"
                  bullets={[
                    "Assisted senior managers in developing business strategies and preparing client presentations.",
                    "Increased customer satisfaction by 25% through improved communication and service coordination.",
                    "Coordinated daily activities of junior analysts and supported internal marketing initiatives.",
                    "Contributed to the creation and execution of Business Continuity Plans.",
                  ]}
                />
              </Section>

              <Section title="EDUCATION" accent>
                <h4 contentEditable suppressContentEditableWarning className="font-semibold text-[13px]">
                  MSc in Economics and Business Administration
                </h4>
                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  The University of Chicago
                </p>
                <p contentEditable suppressContentEditableWarning className="text-blue-500 text-[12px]">
                  09/2008 – 06/2010
                </p>
              </Section>

              <Section title="LANGUAGES">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span contentEditable suppressContentEditableWarning className="w-20 text-[12px]">
                      {lang.name}
                    </span>

                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <span
                          key={dot}
                          onClick={() => {
                            const updated = [...languages];
                            updated[i].level = dot;
                            setLanguages(updated);
                          }}
                          className={`w-3 h-3 rounded-full cursor-pointer ${
                            dot <= lang.level ? "bg-blue-500" : "bg-blue-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Section>
            </div>

            <div className="col-span-2 space-y-7">
              <Section title="SKILLS">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <p contentEditable suppressContentEditableWarning className="w-[120px] text-[12px]">
                      {skill.name}
                    </p>

                    <div className="flex-1 h-[6px] bg-gray-200 rounded">
                      <div
                        className="h-[6px] bg-blue-500 rounded"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </Section>

              <Section title="ORGANIZATIONS">
                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  American Management Association (2015 – Present)
                </p>
                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  Association of Private Enterprise Education (2014 – Present)
                </p>
                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  eBusiness Association (eBA) (2013 – Present)
                </p>
              </Section>

              <Section title="HONOURS AND AWARDS">
                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  Jury Member, Venture Cup Entrepreneurship Competition (2016)
                  <br />
                  <span className="italic text-gray-500">Venture Cup USA</span>
                </p>

                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  Sales Individual & Business Development Award (2015)
                  <br />
                  <span className="italic text-gray-500">AirState Business Awards</span>
                </p>

                <p contentEditable suppressContentEditableWarning className="text-[12px]">
                  Excellence in Customer Partnering Award
                  <br />
                  <span className="italic text-gray-500">
                    Institute of Excellence in Sales
                  </span>
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING MENU BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => { setMenuOpen(!menuOpen); setSubmenuOpen(false); }}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition hover:scale-105"
          style={{ background: "linear-gradient(135deg, #d9c7a1, #c9b48f)" }}
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
    </>
  );
}
/* ================= COMPONENTS ================= */

function Section({ title, children, accent }) {
  return (
    <div className="relative">
      {accent && (
        <div className="absolute -left-4 top-1 h-6 w-[4px] bg-blue-500" />
      )}
      <h3 className="font-bold text-[14px] mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Experience({ title, company, date, location, bullets }) {
  return (
    <div>
      <h4 contentEditable suppressContentEditableWarning className="font-semibold text-[13px]">
        {title}
      </h4>
      <p contentEditable suppressContentEditableWarning className="text-[12px]">
        {company}
      </p>

      <div className="flex justify-between text-blue-500 text-[12px]">
        <span contentEditable suppressContentEditableWarning>{date}</span>
        <span contentEditable suppressContentEditableWarning>{location}</span>
      </div>

      <ul className="list-disc ml-5 text-[12px] mt-1 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} contentEditable suppressContentEditableWarning>
            {b}
          </li>
        ))}
      </ul>
    </div>
    
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center justify-end gap-2">
      {icon === "email" && (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )}

      {icon === "phone" && (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.25 1.01l-2.2 2.19z" />
        </svg>
      )}

      {icon === "location" && (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
      )}

      <span contentEditable suppressContentEditableWarning className="text-[12px]">
        {text}
      </span>
    </div>
  );
}
