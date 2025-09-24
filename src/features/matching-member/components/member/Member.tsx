import React, { useState } from "react";
import "./Member.css";
import UserProfileModal from "../modal/ProfileModal";

interface MemberType {
  id: number;
  name: string;
  major: string;
  class: string;
  description: string;
  skills: string[];
}

const members: MemberType[] = [
  {
    id: 1,
    name: "Jamie Lee",
    major: "Software Engineering",
    class: "SE1704",
    description: "Backend Developer • Night Owl • Available evenings",
    skills: ["Node.js", "Python", "MongoDB"],
  },
  {
    id: 2,
    name: "Priya Patel",
    major: "UI/UX Design",
    class: "SE1705",
    description: "UI/UX Designer • Punctual • Presentation expert",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 3,
    name: "Carlos Mendez",
    major: "Web Development",
    class: "SE1706",
    description: "Frontend Developer • Early Bird • Creative problem solver",
    skills: ["React", "TypeScript", "CSS"],
  },
];

function Member() {
  const [open, setOpen] = useState(false);
  
    const handleOpenModalDetail = () => {
    setOpen(true);
    }
  return (
    <div className="member-list">
      {members.map((m) => (
        <div key={m.id} className="member-card">
          <div className="member-left">
            <div className="member-avatar">{m.name.charAt(0)}</div>
            <div className="member-info">
              <div className="member-header">
                <h3 className="member-name">{m.name}</h3>
              </div>
              <p className="member-major">
                {m.major} • {m.class}
              </p>
              <p className="member-desc">{m.description}</p>
              <div className="skills">
                {m.skills.map((s, i) => (
                  <span key={i} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="member-actions">
            <button className="btn-contact-member">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
              Liên hệ</button>
            <button className="btn-profile-member" onClick={handleOpenModalDetail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              Xem chi tiết</button>
          </div>
        </div>
      ))}
      <UserProfileModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Member;
