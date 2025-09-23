import React from "react";
import { Modal, Button, Tag } from "antd";
import "./GroupModalView.css";

interface Member {
  id: number;
  name: string;
  role: string;
  online?: boolean;
}

interface Position {
  id: number;
  title: string;
  description: string;
  urgent?: boolean;
}

interface GroupDetailModalProps {
  open: boolean;
  onClose: () => void;
}

const GroupDetailModal: React.FC<GroupDetailModalProps> = ({ open, onClose }) => {
  const members: Member[] = [
    { id: 1, name: "Nguyễn Văn A", role: "Trưởng nhóm", online: true },
    { id: 2, name: "Trần Thị B", role: "Frontend Developer", online: true },
  ];

  const positions: Position[] = [
    {
      id: 1,
      title: "Backend Developer",
      description: "Cần có kinh nghiệm Node.js, Express, MongoDB",
      urgent: true,
    },
    {
      id: 2,
      title: "Tester",
      description: "Có kinh nghiệm testing, viết test case",
      urgent: true,
    },
  ];

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
            <h2>Dự án nhóm</h2>
            <p className="group-view-course">EXE101</p>
            <p className="group-view-desc">
              Tìm thành viên có kinh nghiệm backend development
            </p>
          </div>
          <div className="group-view-member-count">2/5 thành viên</div>
        </div>

        {/* Basic info */}
        <div className="group-view-section">
          <h4>Thông tin cơ bản</h4>
          <div className="group-view-basic-info">
            <p>Ngày tạo: 1/5/2024</p>
            <p>Hạn chót: 1/7/2024</p>
            <p>Người tạo: Nguyễn Văn A</p>
            <p>Loại dự án: Thực tập tốt nghiệp</p>
          </div>
        </div>

        {/* Skills */}
        <div className="group-view-section">
          <h4>Kỹ năng nhóm</h4>
          <div className="group-view-tag-list">
            <Tag color="blue">Node.js</Tag>
            <Tag color="blue">Express</Tag>
            <Tag color="blue">MongoDB</Tag>
          </div>
        </div>

        {/* Members */}
        <div className="group-view-section">
          <h4>Thành viên hiện tại</h4>
          {members.map((m) => (
            <div key={m.id} className="group-view-member-item">
              <div className="group-view-avatar">{m.name.charAt(0)}</div>
              <div>
                <strong>{m.name}</strong>
                <p>{m.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Positions */}
        <div className="group-view-section">
          <h4>Đang tìm kiếm ({positions.length} vị trí)</h4>
          {positions.map((pos) => (
            <div key={pos.id} className="group-view-position-item">
              <strong>{pos.title}</strong>
              <p>{pos.description}</p>
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

// <GroupDetailModal open={open} onClose={() => setOpen(false)} />