import React, { useState, useRef, useEffect } from 'react'
import "./MyInfor.css"
import Header from '../../../components/header/Header'
import Sidebar from '../../../components/sidebar/Sidebar'
import { createImageAPI, getProfileAPI, getStudentIdAPI, updateStudentAPI, updateUserAPI } from '../apis'
import { useAppSelector } from '../../../store/hooks'

interface UserInfo {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  avatarUrl: string
  address: string
  role: string
  permissions: string[]
  student?: {
    id: number
    studentCode: string
    campus?:{
      id: number
      name: string
    }
    skill: string
    goals: number
    description: string
    major: string | null
  }
}

interface UserUpdate {
  id?: number
  username?: string
  phone?: string
  avatarUrl?: string
  campusId?: number
  major?: string
}

interface Image {
  file: string
}

interface StudentInfo {
  id: number
  major: string
}

const MyInfor: React.FC = () => {
  const user = useAppSelector((state) => state.user)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userUpdate, setUserUpdate] = useState<UserUpdate | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null)

  useEffect(() => {
  const handleFetchStudentId = async () => {
    try {
      const response = await getStudentIdAPI(Number(user?.studentId));
      setStudentInfo(response.result);
    } catch (error) {
      console.error("Lỗi khi fetch student info:", error);
    }
  };

  if (user?.studentId) {
    handleFetchStudentId();
  }
}, [user?.studentId]);


  useEffect(() => {
    const handleFetchProfile = async () => {  
      try {
        const response = await getProfileAPI()
        setUserInfo(response?.result)
      } catch (error) {
        console.error("Lỗi khi fetch profile", error)
      }
    }
    handleFetchProfile()
  }, [])

  const handleClickImage = () => {
    fileInputRef.current?.click()
  }

  const handleSave = async () => {
  if (!userUpdate) return;
  try {
    const payload = {
      username: userUpdate.username,
      phone: userUpdate.phone,
      campusId: userUpdate.campusId,
    };
    const payloadStudent = {
      major: userUpdate.major
    }
    await updateUserAPI(Number(user.id), payload);
    await updateStudentAPI(Number(user.studentId), payloadStudent)
    const response = await getProfileAPI();
    setUserInfo(response?.result);
    const response1 = await getStudentIdAPI(Number(user.studentId))
    setStudentInfo(response1?.result);
    setIsEditing(false);
  } catch (err) {
    console.error("Update user failed:", err);
  }
};

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleEdit = () => {
  if (userInfo) {
    setUserUpdate({
      username: userInfo.username,
      phone: userInfo.phone,
      campusId: userInfo.student?.campus?.id || 0,
      major: userInfo.student?.major || "",
    });
  }
  setIsEditing(true);
};


const handleInputChange = (field: string, value: any) => {
  setUserUpdate((prev) => {
    if (!prev) return null;
    // if (["campusId", "major"].includes(field)) {  chỉ check các field có logic đặc biệt
    //   return {
    //     ...prev,
    //     [field]: value,
    //   };
    // }
    return {
      ...prev,
      [field]: value,
    };
  });
}; 

  return (
    <div className="my-infor-page">
        <Header title='Thông tin cá nhân' script='Quản lý thông tin cá nhân của bạn' />
        <Sidebar />
        <div className='my-infor-content-wrapper'>
          <div className='my-infor-main-content'>
            <div className="my-infor-container">
              <div className="profile-header">
                <div className="header-background">
                  <div className="header-overlay"></div>
                </div>
                <div className="profile-content">
                  {/* Avatar Section */}
                  <div className="avatar-section">
                      <div className="avatar-wrapper" onClick={handleClickImage}>
                        <img src={previewUrl || userInfo?.avatarUrl} alt="Avatar" className="avatar-image" />
                      <div className="avatar-overlay">
                        <span className="camera-icon">📷</span>
                        <span className="change-text">Thay đổi</span>
                      </div>
                    </div>
                    {/* Input file ẩn */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setPreviewUrl(URL.createObjectURL(file)); // hiển thị tạm thời

                          try {
                            // Gọi API upload ảnh
                            const res = await createImageAPI(file);

                            // Giả sử backend trả về link thật trong res.result
                            const newAvatarUrl = res.result;
                            if (newAvatarUrl) {
                              await updateUserAPI(Number(user.id), { avatarUrl: newAvatarUrl });
                              
                              // Cập nhật user info
                              const profileRes = await getProfileAPI();
                              setUserInfo(profileRes?.result);

                              setPreviewUrl(null); // dùng link thật, bỏ preview
                            }
                          } catch (error) {
                            console.error("Upload avatar failed", error);
                          }
                        }
                      }}
                      />
                  </div>

                  {/* User Basic Info */}
                  <div className="user-basic-info">
                    <h1 className="user-name">{userInfo?.username}</h1>
                    <p className="user-email">{userInfo?.email}</p>
                    <p className="user-id">ID: {userInfo?.student?.studentCode}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    {!isEditing ? (
                      <button className="edit-btn" onClick={handleEdit}>
                        <span className="edit-icon">✏️</span>
                        Chỉnh sửa thông tin
                      </button>
                    ) : (
                      <div className="edit-actions">
                        <button className="save-btn" onClick={handleSave}>
                          <span className="save-icon">💾</span>
                          Lưu
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                          <span className="cancel-icon">❌</span>
                          Hủy
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Information Cards */}
              <div className="info-cards-container">
                {/* Academic Information Card */}
                <div className="info-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <span className="card-icon">🎓</span>
                      Thông tin học tập
                    </h3>
                  </div>
                  <div className="card-content">
                    <div className="info-grid">
                      <div className="info-item">
                        <label className="info-label">Trường</label>                 
                          <span className="info-value">FPT University</span>
                      </div>
                      <div className="info-item">
                        <label className="info-label">Cơ sở</label>
                        {isEditing ? (
                          <select
                            value={userUpdate?.campusId}
                            onChange={(e) => handleInputChange('campusId', Number(e.target.value))}
                            className="info-select"
                          >
                            <option value="1">Hòa Lạc</option>
                            <option value="2">TP. Hồ Chí Minh</option>
                            <option value="3">Đà Nẵng</option>
                            <option value="4">Cần Thơ</option>
                            <option value="5">Quy Nhơn</option>
                          </select>
                        ) : (
                          <span className="info-value">{userInfo?.student?.campus?.name}</span>
                        )}
                      </div>
                      <div className="info-item">
                        <label className="info-label">Ngành</label>                 
                          <span className="info-value">
                            {isEditing ? (
                          <input
                            type="text"
                            value={userUpdate?.major}
                            onChange={(e) => handleInputChange('major', e.target.value)}
                            className="info-input"
                          />
                        ) : (
                          <span className="info-value">{studentInfo?.major}</span>
                        )}
                          </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information Card */}
                <div className="info-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <span className="card-icon">👤</span>
                      Thông tin cá nhân
                    </h3>
                  </div>
                  <div className="card-content">
                    <div className="info-grid">
                      <div className="info-item">
                        <label className="info-label">Tên người dùng</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userUpdate?.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className="info-input"
                          />
                        ) : (
                          <span className="info-value">{userInfo?.username}</span>
                        )}
                      </div>

                      <div className="info-item">
                        <label className="info-label">Email</label>
                        <span className="info-value">{userInfo?.email}</span>
                        <small className="info-note">Email không thể thay đổi</small>
                      </div>

                      <div className="info-item">
                        <label className="info-label">Số điện thoại</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userUpdate?.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="info-input"
                          />
                        ) : (
                          <span className="info-value">{userInfo?.phone}</span>
                        )}
                      </div>

                      <div className="info-item">
                        <label className="info-label">Mã sinh viên</label>
                        <span className="info-value">{userInfo?.student?.studentCode}</span>
                        <small className="info-note">Mã sinh viên không thể thay đổi</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MyInfor