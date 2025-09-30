import React, { useEffect, useState } from "react";
import "./MyGroup.css";
import GroupModalView from "../modal/GroupModalView";
import GroupModalForm from "../modal/GroupModalForm";
import { deleteGroup, getGroupStudentId } from "../../apis";
import { useAppSelector } from "../../../../store/hooks";
import Pagination from "../../../review/components/Pagination/Pagination";
import { Modal } from "antd";
import Notification from "../../../../components/notification/Notification";
import ConfirmDelete from "../../../../components/confirm-delete/ConfirmDelete";
import FindingFilter from "../filter/FindingFilter";

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

export interface Skill {
  id: number,
  skill: {
    id: number,
    name: string
  }
}

export interface User {
  id: number,
  username: string,
  email: string,
  avatarUrl: string
}

export interface TeamRequest{
  id: number;
  title: string;
  skills: Skill[]
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
  teamRequest: TeamRequest[];
  teamMember: any | null;
  createdBy: {
    id: number,
    user: User
  };
  requestCount: number;
  memberCount: number
}

function MyGroup() {
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;
  const [groups, setGroup] = useState<Team[]>([])
  const user = useAppSelector((state) => state.user)
  const studentId = user?.studentId
  const [noti, setNoti] = useState<{ message: string; type: any } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filteredFeeds, setFilteredFeeds] = useState<Team[]>([])

        const handleOpenGroupModalView = (id: number) => {
        setOpenView(true);
        setSelectedId(id)
        }

      const  handleOpenGroupModalForm = (id: number) => {
        setOpenForm(true)
        setSelectedId(id)
      }

  const fetchGroupByStudentId = async () => {
    try {
      const response = await getGroupStudentId(Number(studentId), currentPage, pageSize);
      setGroup(response.result.data);
      setFilteredFeeds(response?.result?.data || [])
      setTotalElements(response.result.totalElements)
    } catch (err) {
      console.error("Error fetch Group by student id");
    }
  }

  useEffect(() => {  
  fetchGroupByStudentId()
  }, [studentId,currentPage])


  
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh"
    })
  }


const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteGroup(deleteId);
      fetchGroupByStudentId();
      showNotification("Xóa thành công", "success");
    } catch (err: any) {
      showNotification(err?.response?.data?.message || "Xóa thất bại", "error");
    } finally {
      setDeleteId(null);
    }
  };

    const showNotification = (msg: string, type: any) => {
    setNoti({ message: msg, type });
  };

    const handleFilter = (filters: { courseCode: string; skill: string }) => {
  let filtered = groups;

  if (filters.courseCode) {
    filtered = filtered.filter(r =>
      r.course.code.toLowerCase().includes(filters.courseCode.toLowerCase())
    );
  }

  if (filters.skill) {
    filtered = filtered.filter(r =>
      r.teamRequest.some((tR) => tR.skills.some(s =>
        s.skill.name.toLowerCase().includes(filters.skill.toLowerCase())
      ))
    );
  }

  setFilteredFeeds(filtered);
};

const handleReset = () => {
    setFilteredFeeds(groups)
  }

  return (
    <>
    <div className="my-group-list">
      <FindingFilter onFilter={handleFilter} onReset={handleReset} />
      <div className='section-header'>
        <h3>Nhóm của tôi</h3>
        <span className='view-all'>Hiển thị {filteredFeeds.length} yêu cầu</span>
      </div>
      {filteredFeeds.map((g) => (
        <div key={g.id} className="group-card">
          <div className="group-info">
          <div className="group-header">
            <h3 className="group-name">{g.name}</h3>
            <span className="group-code">{g?.course?.code}</span>
          </div>

          <div className="group-stats">
            <div className="stat-box">
              <p>Số thành viên nhóm</p>
              <strong>{g.memberMax}</strong>
            </div>
            <div className="stat-box">
              <p>Hạn chót</p>
              <strong>2 tuần bắt đầu từ ngày đăng</strong>
            </div>
            <div className="stat-box">
              <p>Ngày tạo</p>
              <strong>{formatDate(g.createAt)}</strong>
            </div>
            <div className="stat-box">
              <p>Đang tìm</p>
              <strong>{g?.requestCount} thành viên</strong>
            </div>
          </div>

          <strong>Tiêu đề</strong>
          <p className="">{g.description}</p>

          
          <strong>Kĩ năng yêu cầu</strong>
          <div className="tag-list">
                {g?.teamRequest?.map((tr, index) => (
                  tr.skills.map((s, i) => (
                    <span key={`${index}-${i}`} className="tag">
                      {s?.skill?.name}
                    </span>
                  ))
                ))}
          </div> 
        </div>

          <div className="group-actions">
            <button className="btn-edit-my-group" onClick={() => handleOpenGroupModalForm(g.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
               Chỉnh sửa</button>
            <button className="btn-delete-my-group" onClick={() => setDeleteId(g.id)}>
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
      <GroupModalView open={openView} onClose={() => setOpenView(false)} id={Number(selectedId)} />
      <GroupModalForm open={openForm} onClose={() => setOpenForm(false)} id={Number(selectedId)} isEdit={!!selectedId} onReload={fetchGroupByStudentId} />
    </div>
    {noti && (
        <Notification
          message={noti.message}
          type={noti.type}
          onClose={() => setNoti(null)}
        />
      )}
      <ConfirmDelete
        open={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        title="Xóa Profile"
        content="Bạn có chắc chắn muốn xóa nhóm này không?"
      />
      </>
  );
}

export default MyGroup;
