import React, { useState } from "react";
import "./Group.css";
import GroupDetailModal from "../modal/GroupDetailModal";

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
  const [open, setOpen] = useState(false);

  const handleOpenModalDetail = () => {
  setOpen(true);
}
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
            <button className="btn-contact-group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
              Liên hệ</button>
            <button className="btn-profile-group" onClick={handleOpenModalDetail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              Xem chi tiết</button>
          </div>
        </div>
      ))}
      <GroupDetailModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Group;
