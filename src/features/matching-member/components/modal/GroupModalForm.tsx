import React, { useState } from "react";
import { Modal, Button, Tag, Input, Select } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "./GroupModalForm.css";
const { Option } = Select

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
      <div className="group-form-detail-modal">
        {/* Header */}
        <div className="group-form-modal-header">
          <h2>Thông tin nhóm</h2>
          <p>Đăng nhóm của bạn để tìm thành viên phù hợp</p>
        </div>

          <div className="group-form-section">
            <h4>Dự án nhóm</h4>
            <div className="group-form-project"> 
             <Input
                placeholder="Tên nhóm"
                //value={m.name}
                // onChange={(e) =>
                //   updateMember(m.id, "name", e.target.value)
                // }
              />
              <Input
              placeholder="Số lượng thành viên"
              />
              <Input.TextArea
              autoSize
              placeholder="Mô tả thêm"
              />
              </div>
          </div>

        {/* Information */}
        <div className="group-form-section"> 
          <h4>Thông tin học tập</h4>
          <div className="group-form-info">
            <Select
              // value={filters.slot || undefined}
              // onChange={(value) => handleSelectChange('slot', value)}
              placeholder='Môn học'
              style={{ width: '100%' }}
            >
                {/* {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus?.name}
                </option>
              ))} */}
            </Select>
            <Select
            placeholder="Cơ sở"
            style={{ width: '100%' }}
              // value={formData.campusId || ''}
              // onChange={(e) => handleChange('campusId', e.target.value)}
            >
              {/* {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus?.name}
                </option>
              ))} */}
            </Select>
            <Select
            placeholder="Kỳ học"
            style={{ width: '100%' }}
              // value={formData.campusId || ''}
              // onChange={(e) => handleChange('campusId', e.target.value)}
            >
              {/* {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus?.name}
                </option>
              ))} */}
            </Select>
          </div>
        </div>

        {/* Members */}
        <div className="group-form-section">
          <h4>Thành viên hiện tại</h4>
          {members.map((m) => (
            <div key={m.id} className="group-form-member-item editable">
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
              <Select 
                  // isMulti options={dayOptions}
                  // value={dayOptions.filter(opt => formData.toDays.includes(opt.value))}
                  // onChange={(selected) => {
                  //   const values = selected.map((s) => s.value);
                  //   if (values.length <= 2) handleInputChange("toDays", values);
                  // }}
                  // closeMenuOnSelect={false}
                   placeholder="Kỹ năng (có thể chọn nhiều)" 
                />
              <MinusCircleOutlined
                className="group-form-remove-icon"
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
        <div className="group-form-section">
          <h4>Đang tìm kiếm ({positions.length} vị trí)</h4>
          {positions.map((pos) => (
            <div key={pos.id} className="group-form-position-item editable">
              <Input
                placeholder="Tên vị trí"
                value={pos.title}
                onChange={(e) =>
                  updatePosition(pos.id, "title", e.target.value)
                }
              />
              <Input
                placeholder="Mô tả"
                value={pos.description}
                onChange={(e) =>
                  updatePosition(pos.id, "description", e.target.value)
                }
              />
              <Select 
                  // isMulti options={dayOptions}
                  // value={dayOptions.filter(opt => formData.toDays.includes(opt.value))}
                  // onChange={(selected) => {
                  //   const values = selected.map((s) => s.value);
                  //   if (values.length <= 2) handleInputChange("toDays", values);
                  // }}
                  // closeMenuOnSelect={false}
                   placeholder="Kỹ năng (có thể chọn nhiều)" 
                />
              <MinusCircleOutlined
                className="group-form-remove-icon"
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

        {/* Footer */}
        <div className="group-form-modal-footer">
          <button className="group-form-button-cancel" onClick={onClose}>Đóng</button>
          <button className="group-form-button-create" onClick={onClose}>Lưu</button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDetailModalChange;


// <GroupDetailModal open={open} onClose={() => setOpen(false)} />