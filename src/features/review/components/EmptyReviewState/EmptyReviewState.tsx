import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmptyReviewState.css";

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const AvatarPlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-star-icon lucide-user-star"><path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>
);

interface EmptyReviewStateProps {
  lecturerId: number;
  lecturerName: string;
  lecturerCode: string;
}

const EmptyReviewState: React.FC<EmptyReviewStateProps> = ({ lecturerId, lecturerName, lecturerCode }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate(`/add-review/${lecturerId}`, {
      state: {
        teacherId: lecturerId,
        teacherName: lecturerName,
        teacherCode: lecturerCode,
      },
    });
  };

  return (
    <div className="empty-review-state">
      <div className="empty-icon-wrapper">
        <AvatarPlaceholderIcon/>
      </div>
      <h2>Giảng viên này chưa có review</h2>
      <p>Hãy là người đầu tiên chia sẻ trải nghiệm về giảng viên này.</p>
      <button className="btn-add-review" onClick={handleReviewClick}>
        <AddIcon />
        Review ngay
      </button>
    </div>
  );
};

export default EmptyReviewState;