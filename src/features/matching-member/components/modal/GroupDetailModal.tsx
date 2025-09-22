import React from "react";
import { Modal, Button, Tag } from "antd";
import "./GroupDetailModal.css";

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
      <div className="group-detail-modal">
        {/* Header */}
        <div className="group-header">
          <div>
            <h2>SE1326 Dự án nhóm</h2>
            <p className="group-course">EXE101 • Mở</p>
            <p className="group-desc">
              Tìm thành viên có kinh nghiệm backend development
            </p>
          </div>
          <div className="group-member-count">2/5 thành viên</div>
        </div>

        {/* Basic info */}
        <div className="section">
          <h4>Thông tin cơ bản</h4>
          <div className="basic-info">
            <p>Ngày tạo: 1/5/2024</p>
            <p>Hạn chót: 1/7/2024</p>
            <p>Người tạo: Nguyễn Văn A</p>
            <p>Loại dự án: Thực tập tốt nghiệp</p>
          </div>
        </div>

        {/* Skills */}
        <div className="section">
          <h4>Kỹ năng nhóm</h4>
          <div className="tag-list">
            <Tag color="blue">Node.js</Tag>
            <Tag color="blue">Express</Tag>
            <Tag color="blue">MongoDB</Tag>
          </div>
        </div>

        {/* Members */}
        <div className="section">
          <h4>Thành viên hiện tại</h4>
          {members.map((m) => (
            <div key={m.id} className="member-item">
              <div className="avatar">{m.name.charAt(0)}</div>
              <div>
                <strong>{m.name}</strong>
                <p>{m.role}</p>
              </div>
              {m.online && <span className="online-dot"></span>}
            </div>
          ))}
        </div>

        {/* Positions */}
        <div className="section">
          <h4>Đang tìm kiếm ({positions.length} vị trí)</h4>
          {positions.map((pos) => (
            <div key={pos.id} className="position-item">
              <strong>{pos.title}</strong>
              {pos.urgent && <Tag color="red">Cần gấp</Tag>}
              <p>{pos.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <Button onClick={onClose}>Đóng</Button>
          <Button type="primary">Liên hệ tham gia</Button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDetailModal;

// <GroupDetailModal open={open} onClose={() => setOpen(false)} />