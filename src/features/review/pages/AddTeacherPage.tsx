import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import Header from '../../../components/header/Header';
import AddTeacherForm from '../components/AddTeacherForm/AddTeacherForm';
import './AddTeacherPage.css';

function AddTeacherPage() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log('Teacher data submitted:', data);
    alert('Thông tin giảng viên đã được lưu thành công!');
    navigate('/add-review');
  };

  const handleBack = () => {
    navigate('/add-review');
  };

  return (
    <div className="add-teacher-page-container">
      <Sidebar />
      <Header
        title="Thêm giảng viên"
        script="Thêm thông tin giảng viên mới vào hệ thống"
      />
      <div className="add-teacher-content">
        <AddTeacherForm
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}

export default AddTeacherPage;

