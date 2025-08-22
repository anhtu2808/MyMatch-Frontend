import React from 'react'
import './MyRequest.css'

function MyRequest() {
  return (
    <div className='my-request-container'>
      <div className='section-header'>
        <h2>Yêu cầu gửi tới tôi</h2>
        <span className='view-all'>Hiển thị 3 yêu cầu</span>
      </div>

      {/* Request Card 1 */}
      <div className='request-card'>
        <div className='card-header'>
          <div className='user-info'>
            <div className='avatar'>
              <img src="/api/placeholder/40/40" alt="User" />
            </div>
            <div className='user-details'>
              <h3>Trần Thị B</h3>
              <p>TranThiB@fpt.edu.vn</p>
              <span className='time'>1 ngày trước</span>
            </div>
          </div>
          <div className='status-badges'>
            <span className='status-badge pending'>Đang chờ phản hồi</span>
            <div className='subject-info'>
              <span className='subject-label'>Môn học</span>
              <span className='subject-code'>POL301 - Kinh tế chính trị</span>
            </div>
          </div>
        </div>

        <div className='swap-details'>
          <div className='swap-section'>
            <h4>Họ muốn đổi</h4>
            <div className='class-card want-swap'>
              <div className='class-code'>POL301-01</div>
              <div className='class-info'>
                <div>Trần Thị Bình - BinhTT24</div>
                <div className='schedule'>Thứ 4 - Slot 2 (9:30 - 11:45)</div>
              </div>
            </div>
          </div>

          <div className='swap-arrow'>
            <div className='arrow-icon'>⇄</div>
          </div>

          <div className='swap-section'>
            <h4>Lớp của bạn</h4>
            <div className='class-card your-class'>
              <div className='class-header'>
                <span className='subject-small'>POL301 - Kinh tế chính trị</span>
              </div>
              <div className='class-code'>POL301-02</div>
              <div className='class-info'>
                <div>Phạm Thị Dung - DungPT23</div>
                <div className='schedule'>Thứ 6 - Slot 3 (12:30 - 15:00)</div>
              </div>
            </div>
          </div>
        </div>

        <div className='action-buttons'>
          <button className='btn-call'>📞 Gọi điện</button>
          <button className='btn-message'>💬 Nhắn tin</button>
        </div>
      </div>

      {/* Request Card 2 */}
      <div className='request-card'>
        <div className='card-header'>
          <div className='user-info'>
            <div className='avatar'>
              <img src="/api/placeholder/40/40" alt="User" />
            </div>
            <div className='user-details'>
              <h3>Lê Văn C</h3>
              <p>LeVanC@fpt.edu.vn</p>
              <span className='time'>3 ngày trước</span>
            </div>
          </div>
          <div className='status-badges'>
            <span className='status-badge accepted'>Đã chấp nhận</span>
            <div className='subject-info'>
              <span className='subject-label'>Môn học</span>
              <span className='subject-code'>MOB401 - Cross-platform Development</span>
            </div>
          </div>
        </div>

        <div className='swap-details'>
          <div className='swap-section'>
            <h4>Họ muốn đổi</h4>
            <div className='class-card want-swap'>
              <div className='class-code'>MOB401-02</div>
              <div className='class-info'>
                <div>Hoàng Văn Em - EmHV24</div>
                <div className='schedule'>Thứ 5 - Slot 3 (12:30 - 15:00)</div>
              </div>
            </div>
          </div>

          <div className='swap-arrow'>
            <div className='arrow-icon'>⇄</div>
          </div>

          <div className='swap-section'>
            <h4>Lớp của bạn</h4>
            <div className='class-card your-class'>
              <div className='class-header'>
                <span className='subject-small'>MOB401 - Cross-platform Development</span>
              </div>
              <div className='class-code'>MOB401-01</div>
              <div className='class-info'>
                <div>Hoàng Văn Em - EmHV24</div>
                <div className='schedule'>Thứ 2 - Slot 1 (7:00 - 9:00)</div>
              </div>
            </div>
          </div>
        </div>

        <div className='success-message'>
          <span className='success-icon'>✅</span>
          <span>Bạn đã chấp nhận yêu cầu đổi lớp này</span>
        </div>
      </div>
    </div>
  )
}

export default MyRequest