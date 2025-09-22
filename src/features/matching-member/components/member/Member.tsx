import React from "react";
import "./Member.css";

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
            <button className="btn-contact">Liên hệ</button>
            <button className="btn-profile">Xem profile</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Member;
