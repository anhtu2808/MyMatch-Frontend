import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import Header from '../../../components/header/Header';
import AddTeacherForm from '../components/AddTeacherForm/AddTeacherForm';
import './AddTeacherPage.css';
import Notification from '../../../components/notification/Notification';

function AddTeacherPage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const handleSubmit = (data: any) => {
    console.log('Teacher data submitted:', data);
    setNotification({
      message: 'Thông tin giảng viên đã được lưu thành công!',
      type: 'success',
    });
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
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => {
            setNotification(null);
            navigate('/add-review');  
          }}
        />
      )}
    </div>
  );
}

export default AddTeacherPage;

