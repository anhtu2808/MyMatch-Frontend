import React, { useEffect, useState } from "react";
import { Modal, Button, Tag } from "antd";
import "./ProfileModalView.css";
import { getProfileId } from "../../apis";

// Skill trong Request
export interface SkillItem {
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

interface User {
  id: number;
  username: string;
  email: string;
}

// Student
export interface Student {
  id: number;
  studentCode: string;
  user: User; // nếu sau này có thêm thì define tiếp
  campus: Campus;
  skill: string | null;
  goals: string | null;
  description: string | null;
  major: string;
}

// RequestCourse
export interface RequestCourse {
  id: number;
  code: string;
  name: string;
}

// Semester
export interface Semester {
  id: number;
  name: string;
}

// RequestData (bài đăng tìm team)
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
  skills: SkillItem[];
}

interface UserProfileDetailModalProps {
  open: boolean;
  onClose: () => void;
  id?: number
}

const ProfileModalView: React.FC<UserProfileDetailModalProps> = ({ open, onClose, id }) => {
  const [detailProfile, setDetailProfile] = useState<RequestData | null>(null);

  useEffect(() => {
    if (!open) return
    const fetchProfileDetail = async () => {
      try {
        const response = await getProfileId(Number(id))
        setDetailProfile(response.result)
      } catch (err)  {
        console.error("Error fetch Profile Detail", err);
      }
    }
    fetchProfileDetail()
  }, [id, open])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
  }
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      title={null}
    >
      <div className="profile-view-detail-modal">
        {/* Header */}
        <div className="profile-view-header">
          <div>
            <h2>{detailProfile?.student?.user?.username}</h2>
            <p className="profile-view-major">Ngày tạo yêu cầu: {formatDate(String(detailProfile?.createAt))}</p>
            <p className="profile-view-major">Hạn chót: Đơn sẽ hết hạn sau 2 tuần kể từ ngày đăng</p>
          </div>
        </div>

        {/* About */}
        <div className="profile-view-section">
          <h4>Giới thiệu bản thân</h4>
          <p className="profile-view-desc">Lớp: {detailProfile?.classCode}</p>
          <p className="profile-view-desc">Ngành: {detailProfile?.student?.major}</p>
          <p>
            {detailProfile?.description}
          </p>
        </div>

        {/* Skills */}
        <div className="profile-view-section">
          <h4>Kỹ năng</h4>
          <div className="profile-view-tag-list">
            {detailProfile?.skills.map((m) => (
              <Tag color="blue">{m.skill.name}</Tag>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="profile-view-section">
          <h4>Môn học & Mục tiêu</h4>
          <div className="profile-view-course-list">
            <div className="profile-view-course-item">
              <strong>{detailProfile?.course?.code} - {detailProfile?.course?.name}</strong>
              <span>{detailProfile?.goal} điểm</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="profile-view-section">
          <h4>Thông tin liên hệ</h4>
          <p>Email: <strong>{detailProfile?.student?.user?.email}</strong></p>
        </div>

        {/* Footer */}
        <div className="profile-view-modal-footer">
          <button className="profile-view-button-cancel" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModalView;
