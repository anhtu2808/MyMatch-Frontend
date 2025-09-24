import React, { useEffect, useState } from "react";
import "./MyGroup.css";
import GroupModalView from "../modal/GroupModalView";
import GroupModalForm from "../modal/GroupModalForm";
import { getGroupStudentId } from "../../apis";
import { useAppSelector } from "../../../../store/hooks";
import Pagination from "../../../review/components/Pagination/Pagination";

export interface Course {
  id: number;
  code: string;
  name: string;
}

export interface Semester {
  id: number;
  name: string;
}

export interface University {
  id: number;
  imgUrl: string;
  name: string;
  courses: Course[];
  createAt: string;
  updateAt: string;
}

export interface Campus {
  id: number;
  name: string;
  address: string;
  imgUrl: string;
  createAt: string;
  updateAt: string;
  university: University;
}

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

export interface Team {
  id: number;
  name: string;
  memberMax: number;
  description: string;
  course: Course;
  semester: Semester;
  campus: Campus;
  student: Student;
  createAt: string;
  teamRequest: any | null;
  teamMember: any | null;
}

function MyGroup() {
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;
        const handleOpenGroupModalView = (id: number) => {
        setOpenView(true);
        setSelectedId(id)
        }

      const  handleOpenGroupModalForm = (id: number) => {
        setOpenForm(true)
        setSelectedId(id)
      }

  const [groups, setGroup] = useState<Team[]>([])    
  const user = useAppSelector((state) => state.user)
  const studentId = user?.studentId
  useEffect(() => {
    const fetchGroupByStudentId = async () => {
    try {
      const response = await getGroupStudentId(Number(studentId), currentPage, pageSize);
      setGroup(response.result.data);
      setTotalElements(response.result.totalElements)
    } catch (err) {
      console.error("Error fetch Group by student id");
    }
  }
  fetchGroupByStudentId()
  }, [])
  
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh"
    })
  }

  return (
    <div className="my-group-list">
      {groups.map((g) => (
        <div key={g.id} className="group-card">
          <div className="group-info">
          <div className="group-header">
            <h3 className="group-name">{g.name}</h3>
            <span className="group-code">{g?.course?.code}</span>
          </div>
          <p className="group-desc">{g.description}</p>

          <div className="group-stats">
            <div className="stat-box">
              <p>Thành viên</p>
              <strong>{g.memberMax}</strong>
            </div>
            <div className="stat-box">
              <p>Hạn chót</p>
              <strong>2 tuần sau từ ngày đăng</strong>
            </div>
            <div className="stat-box">
              <p>Ngày tạo</p>
              <strong>{formatDate(g.createAt)}</strong>
            </div>
            <div className="stat-box">
              <p>Đang tìm</p>
              <strong>{g?.teamRequest} vị trí</strong>
            </div>
          </div>

          <div className="group-section">
            <p>Kỹ năng nhóm:</p>
            <div className="tag-list">
              {/* {g.skills.map((s, i) => (
                <span key={i} className="tag">
                  {s}
                </span>
              ))} */}
            </div>
          </div>

          <div className="group-section">
            <p>Thành viên:</p>
            <div className="tag-list">
              {/* {g.members.map((m, i) => (
                <span key={i} className="tag member">
                  {m}
                </span>
              ))} */}
              {g.teamMember}
            </div>
          </div>

          <div className="group-section">
            <p>Đang tìm kiếm:</p>
            <div className="tag-list">
              {/* {g.searching.map((s, i) => (
                <span key={i} className="tag searching">
                  {s}
                </span>
              ))} */}
              {g?.teamRequest}
            </div>
          </div>
          </div>

          <div className="group-actions">
            <button className="btn-edit-my-group" onClick={() => handleOpenGroupModalForm(g.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
               Chỉnh sửa</button>
            <button className="btn-delete-my-group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
               Xóa nhóm</button>
            <button className="btn-detail-my-group" onClick={() => handleOpenGroupModalView(g.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              Xem chi tiết</button>
          </div>
        </div>
      ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalElements}
          onPageChange={(p) => setCurrentPage(p)}
        />
      <GroupModalView open={openView} onClose={() => setOpenView(false)} id={Number(selectedId)}/>
      <GroupModalForm open={openForm} onClose={() => setOpenForm(false)} id={Number(selectedId)} isEdit={!!selectedId}/>
    </div>
  );
}

export default MyGroup;
