import React from 'react'
import './ViewRequestPopup.css'

interface ViewRequestPopupProps {
  isOpen: boolean
  onClose: () => void
  userInfo: {
    id: number
    name: string
    email: string
    studentId: string
    wantedClass: string
    currentClass: string
    subject: string
    teacher: string
    schedule: string
    wantedSchedule: string
    time: string
  }
}

const ViewRequestPopup = ({ isOpen, onClose, userInfo }: ViewRequestPopupProps) => {
  if (!isOpen) return null

  return (
    <div className='popup-overlay' onClick={onClose}>
      <div className='popup-content' onClick={(e) => e.stopPropagation()}>
        <div className='popup-header'>
          <h2>Chi tiết yêu cầu đổi lớp</h2>
          <button className='close-btn' onClick={onClose}>×</button>
        </div>

        <div className='request-card-popup'>
          <div className='card-header-popup'>
            <div className='user-info-popup'>
              <div className='avatar-popup'>
                <img src="/api/placeholder/60/60" alt="User" />
              </div>
              <div className='user-details-popup'>
                <h3>{userInfo.name}</h3>
                <p>{userInfo.email}</p>
                <span className='time-popup'>{userInfo.time}</span>
              </div>
            </div>
            <div className='status-badges-popup'>
              <span className='status-badge-popup pending'>Đang chờ phản hồi</span>
              <div className='subject-info-popup'>
                <span className='subject-label-popup'>Môn học</span>
                <span className='subject-code-popup'>{userInfo.subject}</span>
              </div>
            </div>
          </div>

          <div className='swap-details-popup'>
            <div className='swap-section-popup'>
              <h4>Họ muốn đổi</h4>
              <div className='class-card-popup want-swap'>
                <div className='class-code-popup'>{userInfo.currentClass}</div>
                <div className='class-info-popup'>
                  <div>{userInfo.teacher}</div>
                  <div className='schedule-popup'>{userInfo.schedule}</div>
                </div>
              </div>
            </div>

            <div className='swap-arrow-popup'>
              <div className='arrow-icon-popup'>⇄</div>
            </div>

            <div className='swap-section-popup'>
              <h4>Lớp của bạn</h4>
              <div className='class-card-popup your-class'>
                <div className='class-header-popup'>
                  <span className='subject-small-popup'>{userInfo.subject}</span>
                </div>
                <div className='class-code-popup'>{userInfo.wantedClass}</div>
                <div className='class-info-popup'>
                  <div>{userInfo.teacher}</div>
                  <div className='schedule-popup'>{userInfo.wantedSchedule}</div>
                </div>
              </div>
            </div>
          </div>

          <div className='action-buttons-popup'>
            <button className='btn-reject'>❌ Từ chối</button>
            <button className='btn-accept'>✅ Chấp nhận</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewRequestPopup
