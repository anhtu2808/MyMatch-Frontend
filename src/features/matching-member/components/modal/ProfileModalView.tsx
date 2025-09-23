import React from "react";
import { Modal, Button, Tag } from "antd";
import "./ProfileModalView.css";

interface UserProfileDetailModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModalView: React.FC<UserProfileDetailModalProps> = ({ open, onClose }) => {
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
            <h2>Anhtu2808</h2>
            <p className="profile-view-major">Software Engineering • SE1633</p>
            <p className="profile-view-desc">Flexible • Team Player • Detail-oriented</p>
          </div>
        </div>

        {/* About */}
        <div className="profile-view-section">
          <h4>Giới thiệu bản thân</h4>
          <p>
            Passionate about web development and AI. Looking for a collaborative 
            team to work on innovative projects.
          </p>
        </div>

        {/* Skills */}
        <div className="profile-view-section">
          <h4>Kỹ năng</h4>
          <div className="profile-view-tag-list">
            <Tag color="blue">React</Tag>
            <Tag color="blue">Node.js</Tag>
            <Tag color="blue">Python</Tag>
            <Tag color="blue">UI/UX Design</Tag>
          </div>
        </div>

        {/* Courses */}
        <div className="profile-view-section">
          <h4>Môn học & Mục tiêu</h4>
          <div className="profile-view-course-list">
            <div className="profile-view-course-item">
              <strong>EXE101 - Thực tập tốt nghiệp</strong>
              <span>9.0 - Xuất sắc</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="profile-view-section">
          <h4>Thông tin liên hệ</h4>
          <p>Email: <strong>anhtu2808@fpt.edu.vn</strong></p>
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
