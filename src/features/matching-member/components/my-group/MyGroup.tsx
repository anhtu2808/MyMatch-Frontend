import React, { useState } from "react";
import "./MyGroup.css";
import GroupDetailModal from "../modal/GroupDetailModal";
import GroupDetailModalChange from "../modal/GroupDetailModalChange";

interface GroupType {
  id: number;
  name: string;
  status: "active" | "inactive";
  code: string;
  description: string;
  members: string[];
  skills: string[];
  searching: string[];
  memberCount: string;
  deadline: string;
  createdAt: string;
  openPositions: number;
}

const groups: GroupType[] = [
  {
    id: 1,
    name: "Team Alpha",
    status: "active",
    code: "EXE101",
    description: "Nhóm phát triển ứng dụng web quản lý sinh viên",
    members: ["anhtu2808", "Trần Thị B", "Lê Văn C"],
    skills: ["React", "Node.js", "MongoDB"],
    searching: ["Backend Developer", "UI/UX Designer"],
    memberCount: "3/5",
    deadline: "15/6/2024",
    createdAt: "15/1/2024",
    openPositions: 2,
  },
  {
    id: 2,
    name: "Design Masters",
    status: "active",
    code: "DES202",
    description: "Nhóm thiết kế giao diện website sáng tạo",
    members: ["Nguyễn Văn D", "Phạm Thị E"],
    skills: ["Figma", "Adobe XD", "Prototyping"],
    searching: ["Frontend Developer"],
    memberCount: "2/4",
    deadline: "30/7/2024",
    createdAt: "20/2/2024",
    openPositions: 1,
  },
];

function MyGroup() {
  const [open, setOpen] = useState(false);
  const [openChange, setOpenChange] = useState(false)
        const handleOpenModalDetail = () => {
        setOpen(true);
        }

      const  handleOpenModalChangeDetail = () => {
        setOpenChange(true)
      }
  return (
    <div className="my-group-list">
      {groups.map((g) => (
        <div key={g.id} className="group-card">
          <div className="group-info">
          <div className="group-header">
            <h3 className="group-name">{g.name}</h3>
            <span className={`status ${g.status}`}>
              {g.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
            </span>
            <span className="group-code">{g.code}</span>
          </div>
          <p className="group-desc">{g.description}</p>

          <div className="group-stats">
            <div className="stat-box">
              <p>Thành viên</p>
              <strong>{g.memberCount}</strong>
            </div>
            <div className="stat-box">
              <p>Hạn chót</p>
              <strong>{g.deadline}</strong>
            </div>
            <div className="stat-box">
              <p>Ngày tạo</p>
              <strong>{g.createdAt}</strong>
            </div>
            <div className="stat-box">
              <p>Đang tìm</p>
              <strong>{g.openPositions} vị trí</strong>
            </div>
          </div>

          <div className="group-section">
            <p>Kỹ năng nhóm:</p>
            <div className="tag-list">
              {g.skills.map((s, i) => (
                <span key={i} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="group-section">
            <p>Thành viên:</p>
            <div className="tag-list">
              {g.members.map((m, i) => (
                <span key={i} className="tag member">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="group-section">
            <p>Đang tìm kiếm:</p>
            <div className="tag-list">
              {g.searching.map((s, i) => (
                <span key={i} className="tag searching">
                  {s}
                </span>
              ))}
            </div>
          </div>
          </div>

          <div className="group-actions">
            <button className="btn-edit-my-group" onClick={handleOpenModalChangeDetail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
               Chỉnh sửa</button>
            <button className="btn-delete-my-group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
               Xóa nhóm</button>
            <button className="btn-detail-my-group" onClick={handleOpenModalDetail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              Xem chi tiết</button>
          </div>
        </div>
      ))}
      <GroupDetailModal open={open} onClose={() => setOpen(false)} />
      <GroupDetailModalChange open={openChange} onClose={() => setOpenChange(false)} />
    </div>
  );
}

export default MyGroup;
