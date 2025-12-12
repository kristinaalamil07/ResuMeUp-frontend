import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResumeById, saveResume } from "../lib/api";

export default function ResumeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState({ name: "", email: "", experience: "" });

  useEffect(() => {
    if (id !== "new") {
      const data = getResumeById(id);
      if (data) setResume(data);
    }
  }, [id]);

  function handleSave(e) {
    e.preventDefault();
    saveResume(resume);
    alert("Resume saved!");
    navigate("/resumes");
  }

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-2xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold">{id === "new" ? "Create Resume" : "Edit Resume"}</h2>
      <input type="text" placeholder="Full Name" className="w-full border rounded-lg px-3 py-2" 
             value={resume.name} onChange={e => setResume({...resume, name: e.target.value})}/>
      <input type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2" 
             value={resume.email} onChange={e => setResume({...resume, email: e.target.value})}/>
      <textarea placeholder="Experience" className="w-full border rounded-lg px-3 py-2" rows={6}
                value={resume.experience} onChange={e => setResume({...resume, experience: e.target.value})}/>
      <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Save Resume</button>
    </form>
  );
}
