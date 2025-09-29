import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import ProfileModalForm from "../modal/ProfileModalForm";
import ProfileModalView from "../modal/ProfileModalView";
import { useAppSelector } from "../../../../store/hooks";
import { deleteProfile, getProfileStudentId } from "../../apis";
import Pagination from "../../../review/components/Pagination/Pagination";
import { Modal } from "antd";

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
  user: any | null; // nếu API có trả thêm thì define sau
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

function MyProfile() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const { confirm } = Modal;
  const pageSize = 10;
      const handleOpenProfileModalForm = (id: number) => {
      setOpenForm(true);
      setSelectedId(id)
      }
      const handleOpenProfileModalView = (id: number) => {
      setOpenView(true);
      setSelectedId(id)
      }

  const [profiles, setProfile] = useState<RequestData[]>([])
  const user = useAppSelector((state) => state.user)
  const studentId = user?.studentId
  const username = user?.name

  const fetchProfileByStudentId = async () => {
          try {
            const response = await getProfileStudentId(Number(studentId), currentPage, pageSize)
            setProfile(response.result.data)
            setTotalElements(response.result.totalElements)
          } catch (err) {
            console.error("Error fetch Profile by student id", err);
          } 
        }

  useEffect(() => {
  fetchProfileByStudentId()
  }, [studentId, currentPage])

    const handleDelete = async (id: number) => {
    confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa profile này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true }, // nút đỏ
      onOk: async () => {
        try {
          await deleteProfile(id);
          fetchProfileByStudentId()
        } catch (err) {
          console.error("Error delete my profile", err);
        }
      },
    });
  };

  return (
    <div className="my-profile-list">
      {profiles.map((p) => (
        <div className="profile-card-container">
        <div key={p.id} className="profile-card">
          <div className="profile-info">
          {/* Header */}
          <div className="my-profile-header">
              {/* <div className="avatar">{p.name.charAt(0)}</div> */}
                <h3 className="profile-name">{username}  <p className="profile-major"> ({p?.student?.major})</p> </h3>
          </div>

          {/* Intro */}
          <div className="profile-section">
          <p>Tiêu đề</p>
            <p className="profile-intro">{p.requestDetail}</p>
          </div>

          {/* Skills */}
          <div className="profile-section">
            <p>Kỹ năng</p>
            <div className="tag-list">
              {p.skills.map((s, i) => (
                <span key={i} className="tag">{s?.skill?.name}</span>
              ))}
            </div>
          </div>

          </div>
           <div className="my-profile-actions">
              <button className="my-profile-btn-edit" onClick={() => handleOpenProfileModalForm(p.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                Chỉnh sửa</button>
              <button className="my-profile-btn-delete" onClick={() => handleDelete(p.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Xóa profile</button>
                <button className="my-profile-btn-detail" onClick={() => handleOpenProfileModalView(p.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                Xem chi tiết</button>
            </div>
        </div>


              {/* Courses */}
          <div className="profile-section">
            <p>Môn học & Mục tiêu điểm</p>
            <div className="course-list">
                <div className="course-item">
                  <span>{p?.course?.name}</span>
                  <strong>Mục tiêu: {p.goal} điểm</strong>
                </div>
            </div>
          </div>
      </div>  
      ))}
      <Pagination
          currentPage={currentPage}
          totalPages={totalElements}
          onPageChange={(p) => setCurrentPage(p)}
        />
      <ProfileModalForm open={openForm} onClose={() => setOpenForm(false)} id= {Number(selectedId)} isEdit={!!selectedId} onReload={fetchProfileByStudentId}/>
      <ProfileModalView open={openView} onClose={() => setOpenView(false)} id= {Number(selectedId)}/>
    </div>
  );
}

export default MyProfile;
