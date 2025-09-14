import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <Sidebar />
      <Header title="Bảng điều khiển" script="Quản lý hoạt động của bạn" />
      <div className="home-main-content">
        <div className="home-container">
          <div className="welcome-section">
            <h1 className="welcome-title">
              <span className="welcome-icon">👋</span>
              Chào mừng đến với MyMatch!
            </h1>
            <p className="welcome-description">
              Hệ thống hỗ trợ trao đổi lớp học dành cho sinh viên
            </p>
          </div>

          <div className="quick-actions">
            <h2 className="section-title">Hành động nhanh</h2>
            <div className="actions-grid">

              <div className="action-card">
                <div className="card-icon">🔄</div>
                <h3 className="card-title">Trao đổi lớp học</h3>
                <p className="card-description">
                  Tìm kiếm và trao đổi lớp học phù hợp
                </p>
              </div>

              <div className="action-card">
                <div className="card-icon">💬</div>
                <h3 className="card-title">Tin nhắn</h3>
                <p className="card-description">
                  Liên hệ với các sinh viên khác
                </p>
              </div>

              <div className="action-card">
                <div className="card-icon">👤</div>
                <h3 className="card-title">Hồ sơ cá nhân</h3>
                <p className="card-description">
                  Xem và chỉnh sửa thông tin cá nhân
                </p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h2 className="section-title">Thống kê</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Yêu cầu trao đổi</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Tin nhắn mới</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Lớp đã trao đổi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
