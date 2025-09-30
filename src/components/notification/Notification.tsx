import React, { useEffect } from "react";
import "./Notification.css";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number; // thời gian thông báo 
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notification-container">
      <div className={`notification ${type}`}>
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
