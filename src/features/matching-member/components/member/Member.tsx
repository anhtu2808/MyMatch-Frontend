import React, { useEffect, useState } from "react";
import "./Member.css";
import ProfileModalView from "../modal/ProfileModalView";
import { getProfile } from "../../apis";
import Pagination from "../../../review/components/Pagination/Pagination";

// Skill của member
export interface Skill {
  id: number;
  requestId: number | null;
  skill: {
    id: number;
    name: string;
  };
}

// Course trong University
export interface Course {
  id: number;
  code: string;
  name: string;
}

// University
export interface University {
  id: number;
  imgUrl: string;
  name: string;
  courses: Course[];
  createAt: string;
  updateAt: string;
}

// Campus
export interface Campus {
  id: number;
  name: string;
  address: string;
  imgUrl: string;
  createAt: string;
  updateAt: string;
  university: University;
}

// Student
export interface Student {
  id: number;
  studentCode: string;
  user: any | null;
  campus: Campus;
  skill: string | null;
  goals: string | null;
  description: string | null;
  major: string;
}

// Course & Semester dùng trong Request
export interface RequestCourse {
  id: number;
  code: string;
  name: string;
}

export interface Semester {
  id: number;
  name: string;
}

// Request data (bài đăng tìm team)
export interface RequestData {
  id: number;
  student: Student;
  requestDetail: string;
  goal: number;
  classCode: string;
  course: RequestCourse;
  semester: Semester;
  campus: Campus;
  description: string;
  status: string;
  createAt: string;
  skills: Skill[];
}

function Member() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;
    const handleOpenProfileModalForm = (id: number) => {
    setOpen(true);
    setSelectedId(id);
    }
  
  const [members, setMembers] = useState<RequestData[]>([]) 
  console.log("member", members);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(currentPage, pageSize)
        setMembers(response.result.data)
        setTotalElements(response.result.totalElements);
      } catch (err) {
        console.error("Error fetch profile", err);
      }
    }
    fetchProfile()
  }, [currentPage])

  return (
    <div className="member-list">
      {members.map((m) => (
        <div key={m.id} className="member-card">
          <div className="member-left">
            {/* <div className="member-avatar">
              <img src={} alt="" />
            </div> */}
            <div className="member-info">
              <div className="member-header">
                <h3 className="member-name">Tên người đăng</h3>
              </div>
              <p className="member-major">
                {m?.student.major} • {m.course.code}
              </p>
              <p className="member-desc">{m.description}</p>
              <div className="skills">
                {m.skills.map((s, i) => (
                  <span key={i} className="skill-tag">
                    {s.skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="member-actions">
            <button className="btn-contact-member">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
              Liên hệ</button>
            <button className="btn-profile-member" onClick={()=>handleOpenProfileModalForm(m.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              Xem chi tiết</button>
          </div>
        </div>
      ))}
      {/* ✅ Pagination */}
      <Pagination
          currentPage={currentPage}
          totalPages={totalElements}
          onPageChange={(p) => setCurrentPage(p)}
        />
      <ProfileModalView open={open} onClose={() => setOpen(false)} id={selectedId ?? undefined}/>
    </div>
  );
}

export default Member;
