import React from "react";
import { Modal, Button, Input, Tag, Select } from "antd";
import "./ProfileModalForm.css";

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
      <div className="profile-form-modal">
        {/* Header */}
        <div className="profile-form-modal-header">
          <h2>Chỉnh sửa thông tin profile</h2>
          <p>Đăng profile của bạn để tìm nhóm phù hợp</p>
        </div>

        {/* Basic Info */}
        <div className="profile-form-section">
          <h4>Thông tin cơ bản</h4>
          <div className="profile-form-two-cols">
            <Input placeholder="Lớp" />
          </div>
          <div className="profile-form-input">
            <TextArea autoSize placeholder="Giới thiệu bản thân" />
            <Input  placeholder="Yêu cầu mong muốn"/>
          </div>
        </div>

        {/* Information */}
        <div className="profile-form-section"> 
          <h4>Thông tin học tập</h4>
          <div className="profile-form-info">
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

        {/* Skills */}
        <div className="profile-form-section">
          <h4>Kỹ năng</h4>
            <Select 
              style={{ width: '100%' }}
              // isMulti options={dayOptions}
              // value={dayOptions.filter(opt => formData.toDays.includes(opt.value))}
              // onChange={(selected) => {
              //   const values = selected.map((s) => s.value);
              //   if (values.length <= 2) handleInputChange("toDays", values);
              // }}
              // closeMenuOnSelect={false}
                 placeholder="Kỹ năng (có thể chọn nhiều)" 
            />         
        </div>

        {/* Courses */}
        <div className="profile-form-section">
          <h4>Môn học</h4>
          <div className="profile-form-two-cols">
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
            <Input placeholder="Mục tiêu mấy điểm" />
          </div>
        </div>

        {/* Footer */}
        <div className="profile-form-modal-footer">
          <button className="profile-form-button-cancel" onClick={onClose}>Hủy</button>
          <button className="profile-form-button-create">Lưu</button>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
