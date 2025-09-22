import React from "react";
import { Modal, Button, Input, Tag } from "antd";
import "./ProfileModal.css";

const { TextArea } = Input;

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      title={null}
    >
      <div className="profile-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>Chỉnh sửa thông tin profile</h2>
          <p>Đăng profile của bạn để tìm nhóm phù hợp</p>
        </div>

        {/* Basic Info */}
        <div className="section">
          <h4>Thông tin cơ bản</h4>
          <div className="two-cols">
            <Input placeholder="Họ và tên *" />
            <Input placeholder="Ngành học *" />
          </div>
          <div className="two-cols">
            <Input placeholder="Lớp *" />
          </div>
          <TextArea rows={3} placeholder="Giới thiệu bản thân" />
        </div>

        {/* Skills */}
        <div className="section">
          <h4>Kỹ năng</h4>
          <Input placeholder="Nhập kỹ năng, cách nhau bằng dấu phẩy" />
          <div className="tag-list">
            <Tag color="blue">React</Tag>
            <Tag color="blue">Node.js</Tag>
            <Tag color="blue">UI/UX</Tag>
          </div>
        </div>

        {/* Courses */}
        <div className="section">
          <h4>Môn học</h4>
          <div className="two-cols">
            <Input placeholder="EXE201" />
            <Input placeholder="Mục tiêu mấy điểm" />
          </div>
        </div>

        {/* Contact */}
        <div className="section">
          <h4>Thông tin liên hệ</h4>
          <div className="two-cols">
            <Input placeholder="Email *" />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary">Lưu thay đổi</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
