import React, { useEffect, useState } from "react";
import "./Group.css";
import GroupModalView from "../modal/GroupModalView";
import { getGroup } from "../../apis";
import Pagination from "../../../review/components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
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

interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string
}

export interface Student {
  id: number;
  studentCode: string;
  user: User; 
  campus: Campus;
  skill: string | null;
  goals: string | null;
  description: string | null;
  major: string;
}

export interface TeamRequest{
  id: number;
  title: string;
  skills: Skill[]
}

export interface Skill {
  id: number,
  skill: {
    id: number,
    name: string
  }
}

export interface Team {
  id: number;
  name: string;
  memberMax: number;
  description: string;
  course: Course;
  semester: Semester;
  campus: Campus;
  createAt: string;
  createdBy: Student;
  teamRequest: TeamRequest[];
  teamMember: any | null;
  image: string;
  memberCount: number;
  requestCount: number
}

interface GroupProps {
  reload: boolean;
}

const Group: React.FC<GroupProps> = ({reload}) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate()
  const [groups, setGroups] = useState<Team[]>([])
  const [filteredFeeds, setFilteredFeeds] = useState<Team[]>([])

  const handleOpenGroupModalView = (id: number) => {
  setOpen(true);
  setSelectedId(id)
}
  
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await getGroup(currentPage, pageSize)
        setGroups(response.result.data)
        setFilteredFeeds(response?.result?.data || [])
        setTotalElements(response.result.totalPages)
      } catch (err) {
        console.error("Error fetch Groups", err);
      }
    }
    fetchGroup()
  }, [reload, currentPage])

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
    <div className="group-list">
      <FindingFilter onFilter={handleFilter} onReset={handleReset} />
      <div className='section-header'>
        <h3>Tìm nhóm phù hợp</h3>
        <span className='view-all'>Hiển thị {filteredFeeds.length} yêu cầu</span>
      </div>

      {filteredFeeds.map((m) => (
        <div key={m.id} className="group-card">
          <div className="group-left">
            {/* <div className="group-avatar">
                <img src={m.image}/>
            </div> */}
            <div className="group-info">
              <div className="group-header">
                <h3 className="group-name">{m.name}</h3>
              </div>
              <p className="group-subject">{m?.course?.code}</p>
              <p className="group-desc">{m.description}</p>
              <label htmlFor="">Cần tìm thành viên có kĩ năng</label>
              <p className="group-desc">
                {m?.teamRequest?.map((tr, index) => (
                  tr.skills.map((s, i) => (
                    <span key={`${index}-${i}`} className="tag">
                      {s?.skill?.name}
                    </span>
                  ))
                ))}
                </p>
              <p className="group-member">
                Đã có {m.memberCount}/{m.memberMax} thành viên
              </p>
            </div>
          </div>
          <div className="group-actions">
            <button className="btn-contact-group" onClick={() => navigate(`/message/${m?.createdBy?.id}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
              Liên hệ</button>
            <button className="btn-profile-group" onClick={() => handleOpenGroupModalView(m.id)}>
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
      <GroupModalView open={open} onClose={() => setOpen(false)} id={Number(selectedId)}/>
    </div>
  );
}

export default Group;
