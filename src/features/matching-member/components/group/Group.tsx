import React from "react";
import "./Group.css";

interface MemberType {
  id: number;
  name: string;
  major: string;
  code: string;
  description: string;
  subject: string;
  memberQuantity: number;
}

const groups: MemberType[] = [
  {
    id: 1,
    name: "Jamie Lee",
    major: "Software Engineering",
    code: "SE1704",
    description: "Backend Developer • Night Owl • Available evenings",
    subject: "EXE101",
    memberQuantity: 2
  },
  {
    id: 2,
    name: "Priya Patel",
    major: "UI/UX Design",
    code: "SE1705",
    description: "UI/UX Designer • Punctual • Presentation expert",
    subject: "EXE101",
    memberQuantity: 3
  },
  {
    id: 3,
    name: "Carlos Mendez",
    major: "Web Development",
    code: "SE1706",
    description: "Frontend Developer • Early Bird • Creative problem solver",
    subject: "EXE101",
    memberQuantity: 4
  },
];

function Group() {
  return (
    <div className="group-list">
      {groups.map((m) => (
        <div key={m.id} className="group-card">
          <div className="group-left">
            <div className="group-avatar">{m.name.charAt(0)}</div>
            <div className="group-info">
              <div className="group-header">
                <h3 className="group-name">{m.name}</h3>
              </div>
              <p className="group-subject">{m.subject}</p>
              <p className="group-major">
                {m.major} • {m.code}
              </p>
              <p className="group-desc">{m.description}</p>
              <p className="group-member">
                đã có {m.memberQuantity}/5 thành viên
              </p>
            </div>
          </div>
          <div className="group-actions">
            <button className="btn-contact">Liên hệ</button>
            <button className="btn-profile">Xem chi tiết</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Group;
