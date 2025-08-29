import React from "react";
import "./LecturerStats.css";

// Star Icon for rating
const StarIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="#FFC107" 
    stroke="none"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
  </svg>
);

// Chart Icon for percentage
const ChartIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

// Book Icon for difficulty
const BookIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtitle: string;
  color: string;
  progressValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  value, 
  label, 
  subtitle, 
  color,
  progressValue 
}) => {
  return (
    <div className="stat-card" style={{ background: color }}>
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-subtitle">{subtitle}</div>
        {progressValue !== undefined && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

const LecturerStats: React.FC = () => {
  const statsData = [
    {
      icon: <StarIcon />,
      value: "4.2/5.0",
      label: "Đánh giá tổng thể",
      subtitle: "Từ 308 đánh giá",
      color: "linear-gradient(135deg, #0D3675 0%, #1853AA 100%)"
    },
    {
      icon: <BookIcon />,
      value: "85%",
      label: "Số học lại",
      subtitle: "Sinh viên đồng ý",
      color: "linear-gradient(135deg, #0D3675 0%, #1853AA 100%)",
    },
    {
      icon: <ChartIcon />,
      value: "3.1/5.0",
      label: "Mức độ khó",
      subtitle: "",
      color: "linear-gradient(135deg, #0D3675 0%, #1853AA 100%)",
      progressValue: 62
    }
  ];

  return (
    <div className="lecturer-stats">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          subtitle={stat.subtitle}
          color={stat.color}
          progressValue={stat.progressValue}
        />
      ))}
    </div>
  );
};

export default LecturerStats;
