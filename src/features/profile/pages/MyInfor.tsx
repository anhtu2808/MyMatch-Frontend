import React, { useState, useRef, useEffect } from 'react'
import "./MyInfor.css"
import Header from '../../../components/header/Header'
import Sidebar from '../../../components/sidebar/Sidebar'
import { getProfileAPI } from '../apis'
import AddInformationModal from '../../add-personal-information/components/AddInformationModal'
import { getToken } from '../../login/services/localStorageService'
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

const MyInfor: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const user = useAppSelector((state) => state.user)

  console.log("TOken", getToken());
  useEffect(() => {
    const handleFetchProfile = async () => {  
      const response = await getProfileAPI()
      setUserInfo(response?.result)
    }
    handleFetchProfile()
  }, [])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (e) => {
  //       setUserInfo(prev => ({
  //         ...prev,
  //         avatar: e.target?.result as string
  //       }))
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  // const handleInputChange = (field: keyof UserInfo, value: string) => {
  //   setUserInfo(prev => ({
  //     ...prev,
  //     [field]: value
  //   }))
  // }

  const handleSave = () => {
    console.log('Saving user info:', userInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="my-infor-page">
        <Header title='Thông tin cá nhân' script='Quản lý thông tin cá nhân của bạn' />
        <Sidebar />
        {/* Nếu campus rỗng -> bắt nhập thông tin */}
              {(!user?.campus || user?.campus === '') && (
                <AddInformationModal forceOpen />
              )}
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
                    <div className="avatar-wrapper" onClick={handleAvatarClick}>
                      <img src={userInfo?.avatarUrl} alt="Avatar" className="avatar-image" />
                      <div className="avatar-overlay">
                        <span className="camera-icon">📷</span>
                        <span className="change-text">Thay đổi</span>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      // onChange={handleAvatarChange}
                      style={{ display: 'none' }}
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
                      <button className="edit-btn" onClick={() => setIsEditing(true)}>
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
                        {isEditing ? (
                          <input
                            type="text"
                            // value={userInfo.school}
                            // onChange={(e) => handleInputChange('school', e.target.value)}
                            className="info-input"
                          />
                        ) : (
                          <span className="info-value">SCHOOL</span>
                        )}
                      </div>

                      <div className="info-item">
                        <label className="info-label">Cơ sở</label>
                        {isEditing ? (
                          <select
                            // value={userInfo.campus}
                            // onChange={(e) => handleInputChange('campus', e.target.value)}
                            className="info-select"
                          >
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="TP.HCM">TP.HCM</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Cần Thơ">Cần Thơ</option>
                            <option value="Quy Nhon">Quy Nhon</option>
                          </select>
                        ) : (
                          <span className="info-value">{userInfo?.student?.campus?.name}</span>
                        )}
                      </div>

                      <div className="info-item full-width">
                        <label className="info-label">Chuyên ngành</label>
                        {isEditing ? (
                          <select
                            // value={userInfo.major}
                            // onChange={(e) => handleInputChange('major', e.target.value)}
                            className="info-select"
                          >
                            <option value="Kỹ thuật phần mềm">Kỹ thuật phần mềm</option>
                            <option value="Hệ thống thông tin">Hệ thống thông tin</option>
                            <option value="An toàn thông tin">An toàn thông tin</option>
                            <option value="Trí tuệ nhân tạo">Trí tuệ nhân tạo</option>
                            <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
                          </select>
                        ) : (
                          <span className="info-value">MAJOR</span>
                        )}
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
                            // value={userInfo.username}
                            // onChange={(e) => handleInputChange('username', e.target.value)}
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
                            // value={userInfo.phone}
                            // onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="info-input"
                          />
                        ) : (
                          <span className="info-value">PHONE</span>
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