import React, { useState } from "react";
import { Modal, Button, Tag, Input } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "./GroupDetailModalChange.css";

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

const GroupDetailModalChange: React.FC<GroupDetailModalProps> = ({
  open,
  onClose,
}) => {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Nguyễn Văn A", role: "Trưởng nhóm", online: true },
    { id: 2, name: "Trần Thị B", role: "Frontend Developer", online: true },
  ]);

  const [positions, setPositions] = useState<Position[]>([
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
  ]);

  // === Member actions ===
  const addMember = () => {
    const newId = members.length + 1;
    setMembers([...members, { id: newId, name: "", role: "" }]);
  };

  const removeMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const updateMember = (
    id: number,
    field: keyof Member,
    value: string
  ) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // === Position actions ===
  const addPosition = () => {
    const newId = positions.length + 1;
    setPositions([
      ...positions,
      { id: newId, title: "", description: "" },
    ]);
  };

  const removePosition = (id: number) => {
    setPositions(positions.filter((p) => p.id !== id));
  };

  const updatePosition = (
    id: number,
    field: keyof Position,
    value: string
  ) => {
    setPositions(
      positions.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

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
          <div className="group-member-count">
            {members.length}/5 thành viên
          </div>
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
            <div key={m.id} className="member-item editable">
              <Input
                placeholder="Tên thành viên"
                value={m.name}
                onChange={(e) =>
                  updateMember(m.id, "name", e.target.value)
                }
              />
              <Input
                placeholder="Vai trò"
                value={m.role}
                onChange={(e) =>
                  updateMember(m.id, "role", e.target.value)
                }
              />
              <MinusCircleOutlined
                className="remove-icon"
                onClick={() => removeMember(m.id)}
              />
            </div>
          ))}
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={addMember}
          >
            Thêm thành viên
          </Button>
        </div>

        {/* Positions */}
        <div className="section">
          <h4>Đang tìm kiếm ({positions.length} vị trí)</h4>
          {positions.map((pos) => (
            <div key={pos.id} className="position-item editable">
              <Input
                placeholder="Tên vị trí"
                value={pos.title}
                onChange={(e) =>
                  updatePosition(pos.id, "title", e.target.value)
                }
              />
              <Input.TextArea
                placeholder="Mô tả"
                autoSize
                value={pos.description}
                onChange={(e) =>
                  updatePosition(pos.id, "description", e.target.value)
                }
              />
              <MinusCircleOutlined
                className="remove-icon"
                onClick={() => removePosition(pos.id)}
              />
            </div>
          ))}
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={addPosition}
          >
            Thêm vị trí
          </Button>
        </div>

        {/* Meeting */}
        <div className="section">
          <h4>Lịch họp nhóm</h4>
          <p>Họp định kỳ: Thứ 3, Thứ 6 hằng tuần • 19:00-21:00</p>
          <p>
            Họp sắp tới: <strong>Thứ 3, 18/07/2025 - 19:00</strong>
          </p>
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

export default GroupDetailModalChange;


// <GroupDetailModal open={open} onClose={() => setOpen(false)} />