import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickAction.css";

const QuickAction = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Review giảng viên",
      description: "Xem và thêm review giảng viên",
      disabled: false,
      path: "/teachers",
      iconClass: "icon blue",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-star-icon lucide-star"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ),
    },
    {
      title: "Đổi chéo lớp",
      description: "Quản lý đổi chéo lớp",
      disabled: false,
      path: "/swap_class",
      iconClass: "icon green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right-left-icon lucide-arrow-right-left"
        >
          <path d="m16 3 4 4-4 4" />
          <path d="M20 7H4" />
          <path d="m8 21-4-4 4-4" />
          <path d="M4 17h16" />
        </svg>
      ),
    },
    {
      title: "Tài liệu học tập",
      description: "Chia sẻ và tải tài liệu",
      disabled: true,
      path: "",
      iconClass: "icon purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-file-icon lucide-file"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      ),
    },
    {
      title: "Tin nhắn",
      description: "Xem tin nhắn",
      disabled: false,
      path: "/messages",
      iconClass: "icon red",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle-more-icon lucide-message-circle-more"
        >
          <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
          <path d="M8 12h.01" />
          <path d="M12 12h.01" />
          <path d="M16 12h.01" />
        </svg>
      ),
    },
    {
      title: "Tìm đội nhóm",
      description: "Kết nối với các bạn học cùng lớp",
      disabled: true,
      path: "",
      iconClass: "icon yellow",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users-round-icon lucide-users-round"
        >
          <path d="M18 21a8 8 0 0 0-16 0" />
          <circle cx="10" cy="8" r="5" />
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
      ),
    },
    {
      title: "Thêm giảng viên",
      description: "Thêm giảng viên mới vào hệ thống và bắt đầu review",
      disabled: false,
      path: "/add-teacher",
      iconClass: "icon indigo",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-plus-icon lucide-user-round-plus"
        >
          <path d="M2 21a8 8 0 0 1 13.292-6" />
          <circle cx="10" cy="8" r="5" />
          <path d="M19 16v6" />
          <path d="M22 19h-6" />
        </svg>
      ),
    },
    {
      title: "Cài đặt",
      description: "Quản lý tài khoản và tuỳ chọn",
      disabled: false,
      path: "/profile",
      iconClass: "icon gray",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-pen-icon lucide-user-round-pen"
        >
          <path d="M2 21a8 8 0 0 1 10.821-7.487" />
          <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          <circle cx="10" cy="8" r="5" />
        </svg>
      ),
    },
    {
      title: "Nâng cao",
      description: "Trải nghiệm tính năng nâng cao hơn với AI",
      disabled: true,
      path: "",
      iconClass: "icon king",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-crown-icon lucide-crown"
        >
          <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
          <path d="M5 21h14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="quick-actions-grid">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`quick-card ${card.disabled ? "disabled" : ""}`}
          onClick={() => !card.disabled && navigate(card.path)}
          title={card.disabled ? "Tính năng đang được cập nhật" : ""}
        >
          <div className={`quick-icon ${card.iconClass}`}>{card.icon}</div>
          <h2 className="quick-title">{card.title}</h2>
          <p className="quick-desc">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickAction;
