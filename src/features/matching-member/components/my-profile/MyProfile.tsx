import React, { useState } from "react";
import "./MyProfile.css";
import ProfileModalForm from "../modal/ProfileModalForm";
import ProfileModalView from "../modal/ProfileModalView";

interface ProfileType {
  id: number;
  name: string;
  major: string;
  classCode: string;
  traits: string[];
  intro: string;
  skills: string[];
  courses: { name: string; goal: string };
}

const profiles: ProfileType[] = [
  {
    id: 1,
    name: "Vạn Hào",
    major: "Software Engineering • SE1633",
    classCode: "Flexible • Team Player • Detail-oriented",
    traits: [],
    intro:
      "Passionate about web development and AI. Looking for a collaborative team to work on innovative projects.",
    skills: ["React", "Node.js", "Python", "UI/UX Design"],
    courses: { 
      name: "EXE101 - Thực tập tốt nghiệp", 
      goal: "9.0" }
    },
];

function MyProfile() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
      const handleOpenProfileModalForm = () => {
      setOpenForm(true);
      }
      const handleOpenProfileModalView = () => {
      setOpenView(true);
      }
  return (
    <div className="my-profile-list">
      {profiles.map((p) => (
        <div key={p.id} className="profile-card">
          {/* Header */}
          <div className="my-profile-header">
            <div className="profile-info">
              <div className="avatar">{p.name.charAt(0)}</div>
              <div>
                <h3 className="profile-name">{p.name}</h3>
                <p className="profile-major">{p.major}</p>
                <span className="profile-class">{p.classCode}</span>
              </div>
            </div>

            <div className="my-profile-actions">
              <button className="my-profile-btn-edit" onClick={handleOpenProfileModalForm}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                Chỉnh sửa</button>
              <button className="my-profile-btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Xóa profile</button>
                <button className="my-profile-btn-detail" onClick={handleOpenProfileModalView}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                Xem chi tiết</button>
            </div>
          </div>

          {/* Intro */}
          <p className="profile-intro">{p.intro}</p>

          {/* Skills */}
          <div className="profile-section">
            <p>Kỹ năng</p>
            <div className="tag-list">
              {p.skills.map((s, i) => (
                <span key={i} className="tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="profile-section">
            <p>Môn học & Mục tiêu điểm</p>
            <div className="course-list">
                <div className="course-item">
                  <span>{p.courses.name}</span>
                  <strong>Mục tiêu: {p.courses.goal} điểm</strong>
                </div>
            </div>
          </div>
        </div>
      ))}
      <ProfileModalForm open={openForm} onClose={() => setOpenForm(false)} />
      <ProfileModalView open={openView} onClose={() => setOpenView(false)} />
    </div>
  );
}

export default MyProfile;
