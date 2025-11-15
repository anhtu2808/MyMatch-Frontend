import React from "react";
import "./ReviewRewardNotification.css"; // Import file CSS mới tạo
import { useNavigate } from "react-router-dom";

// Định nghĩa Icon SVG nội bộ để tránh lỗi nếu chưa cài lucide-react
const XIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>;
const GiftIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>;
const StarIcon = ({ size=24, fill="none", className="" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const TrendingUpIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const CoinsIcon = ({ className="" }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>;
const AwardIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;
const SparklesIcon = ({ className="" }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 5h4"/></svg>;
const SmallAwardIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;

export const ReviewRewardNotification = ({ isOpen, onClose }) => {
  const navigation = useNavigate();

  if (!isOpen) return null;
  return (
    <div className="reward-overlay">
      <div className="reward-container">
        {/* Close Button */}
        <button onClick={onClose} className="close-btn">
          <XIcon />
        </button>

        {/* Header */}
        <div className="reward-header">
          <div className="header-icon-wrapper">
            <div className="icon-circle">
              <GiftIcon />
            </div>
          </div>
          <h2>🎉 Nhận thưởng ngay!</h2>
          <p>Chia sẻ đánh giá - Nhận coin hấp dẫn</p>
        </div>

        {/* Rewards List */}
        <div className="rewards-list">
          {/* Reward 1: Normal */}
          <div className="reward-card">
            <div className="card-icon">
              <StarIcon size={32} fill="currentColor" />
            </div>
            <div className="card-content">
              <h3 className="card-title">
                Review giảng viên
                <TrendingUpIcon />
              </h3>
              <p className="card-desc">Chia sẻ trải nghiệm học tập của bạn</p>
              <div className="coin-badge">
                <CoinsIcon className="text-amber-500" />
                <span className="coin-amount">+500</span>
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>coins</span>
              </div>
            </div>
          </div>

          {/* Reward 2: Premium */}
          <div className="reward-card premium">
            <div className="card-icon">
              <AwardIcon />
            </div>
            <div className="card-content">
              <h3 className="card-title">
                Review có bằng chứng
                <SparklesIcon />
              </h3>
              <p className="card-desc">Đính kèm ảnh/video để review được xác thực</p>
              <div className="coin-badge">
                <CoinsIcon className="text-purple-600" />
                <span className="coin-amount">+1,500</span>
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>coins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section-reward">
          <div className="tip-box">
            <div className="tip-icon">
              <SparklesIcon />
            </div>
            <p className="tip-text">
              <strong style={{ color: '#1d4ed8' }}>💡 Mẹo:</strong> Review càng chi tiết, có hình ảnh càng giúp ích cho cộng đồng và bạn nhận được nhiều phần thưởng hơn!
            </p>
          </div>

          <div className="action-buttons-reward">
            <button className="btn-primary" onClick={() => navigation("/teachers")}>
              <StarIcon size={20} fill="currentColor" />
              Viết review ngay
            </button>
            <button onClick={onClose} className="btn-secondary">
              Để sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};