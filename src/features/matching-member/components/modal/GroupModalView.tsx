import React, { useEffect, useState } from "react";
import { Modal, Button, Tag } from "antd";
import "./GroupModalView.css";
import { getGroupId } from "../../apis";

// Course
export interface Course {
  id: number;
  code: string;
  name: string;
}

// Semester
export interface Semester {
  id: number;
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

// CreatedBy -> Student
export interface CreatedBy {
  id: number;
  studentCode: string;
  user: any | null; // nếu có schema riêng cho user thì define tiếp
  campus: Campus;
  skill: string | null;
  goals: string | null;
  description: string | null;
  major: string;
}

// Skill trong TeamRequest
export interface TeamRequestSkill {
  id: number;
  skill: {
    id: number;
    name: string;
  };
}

// TeamRequest
export interface TeamRequest {
  id: number;
  title: string;
  description: string | null;
  skills: TeamRequestSkill[];
}

// TeamMember
export interface TeamMember {
  id: number;
  member: {
    id: number;
    name: string;
    note: string | null;
  };
  createAt: string;
}

// Team (result chính)
export interface Team {
  id: number;
  name: string;
  memberMax: number;
  description: string;
  course: Course;
  semester: Semester;
  campus: Campus;
  createdBy: CreatedBy;
  createAt: string;
  teamRequest: TeamRequest[];
  teamMember: TeamMember[];
}

interface GroupDetailModalProps {
  open: boolean;
  onClose: () => void;
  id: number
}

const GroupDetailModal: React.FC<GroupDetailModalProps> = ({ open, onClose, id }) => {
  const [groupDetail, setGroupDetail] = useState<Team | null>(null)

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        const response = await getGroupId(id)
        setGroupDetail(response.result)
      } catch (err) {
        console.error("Error fetch group detail", err);
      }
    }
    fetchGroupDetail()
  },[id])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title={null}
      centered
    >
      <div className="group-view-detail-modal">
        {/* Header */}
        <div className="group-view-header">
          <div>
            <h2>{groupDetail?.name}</h2>
            <p className="group-view-desc">
              {groupDetail?.description}
            </p>
          </div>
          <div className="group-view-member-count">2/{groupDetail?.memberMax} thành viên</div>
        </div>

        {/* Basic info */}
        <div className="group-view-section">
          <h4>Thông tin cơ bản</h4>
          <div className="group-view-basic-info">
            <p>Môn học: {groupDetail?.course?.code}</p>
            <p>Ngày tạo: {groupDetail?.createAt}</p>
            <p>Người tạo: {groupDetail?.createdBy?.studentCode}</p>
            <p>Hạn chót: Đơn sẽ hết hạn sau 2 tuần kể từ ngày đăng</p>
          </div>
        </div>

        {/* Skills */}
        <div className="group-view-section">
          <h4>Kỹ năng nhóm</h4>
          <div className="group-view-tag-list">
            {/* {groupDetail?.teamMember.} */}
            <Tag color="blue">Node.js</Tag>
          </div>
        </div>

        {/* Members */}
        <div className="group-view-section">
          <h4>Thành viên hiện tại</h4>
          {groupDetail?.teamMember.map((m) => (
            <div key={m.id} className="group-view-member-item">
              {/* <div className="group-view-avatar">{m.name.charAt(0)}</div> */}
              <div>
                <strong>{m.member.name}</strong>
                <p>{m.member.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Positions */}
        <div className="group-view-section">
          <h4>Đang tìm kiếm vị trí</h4>
          {groupDetail?.teamRequest.map((pos) => (
            <div key={pos.id} className="group-view-position-item">
              <strong>{pos.title}</strong>
              <p>{pos.description}</p>
              <div className="group-view-tag-list">
                {pos.skills.map((s) => (
                  <Tag color="blue">{s.skill.name}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="group-view-modal-footer">
          <button className="group-view-button-cancel" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDetailModal;