import React, { useState } from "react";
import TeacherSelector from "../TeacherSelector/TeacherSelector";
import "./ReviewSteps.css";
import { getAllLecturerAPI } from "../../apis/TeacherPageApis";

// Check Icon
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

interface Teacher {
  id: string;
  name: string;
  code: string;
}

interface ReviewStepsProps {
  currentStep: number;
  selectedTeacher: Teacher | null;
  onStepChange: (step: number) => void;
  onTeacherSelect: (teacher: Teacher | null) => void;
  onNextStep?: () => void;
  onBackToTeachers?: () => void;
}

const ReviewSteps: React.FC<ReviewStepsProps> = ({
  currentStep,
  selectedTeacher,
  onStepChange,
  onTeacherSelect,
  onNextStep,
  onBackToTeachers,
}) => {
  // State for custom dropdowns
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

  const semesterOptions = [
    { value: "fall2024", label: "Fall 2024" },
    { value: "spring2024", label: "Spring 2024" },
    { value: "summer2024", label: "Summer 2024" },
  ];

  const courseOptions = [
    { value: "SEC303", label: "SEC303 - Bảo mật ứng dụng web" },
    { value: "PRN231", label: "PRN231 - Building Cross-Platform Apps" },
    { value: "SWE201", label: "SWE201 - Introduction to Software Engineering" },
  ];
  const steps = [
    {
      number: 1,
      title: "Chọn giảng viên",
      subtitle: "Tìm kiếm GV",
      completed: currentStep > 1 || !!selectedTeacher?.id,
    },
    {
      number: 2,
      title: "Thông tin môn học",
      subtitle: "Học kỳ & môn học",
      completed: currentStep > 2,
    },
    {
      number: 3,
      title: "Đánh giá chi tiết",
      subtitle: "Viết review",
      completed: currentStep > 3,
    },
  ];

  return (
    <div className="review-steps-container">
      {/* Steps Header */}
      <div className="steps-header">
        <div className="steps-progress">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div
                className={`step-item ${
                  step.completed
                    ? "completed"
                    : currentStep === step.number
                    ? "active"
                    : "pending"
                }`}
                onClick={() => step.completed && onStepChange(step.number)}
              >
                <div className="step-circle">
                  {step.completed ? (
                    <CheckIcon />
                  ) : (
                    <span className="step-number">{step.number}</span>
                  )}
                </div>
                <div className="step-info">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-subtitle">{step.subtitle}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step-connector ${
                    steps[index + 1].completed || currentStep > step.number
                      ? "completed"
                      : ""
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="step-content">
        {currentStep === 1 && (
          <div className="step-1-content">
            <h2>Chọn giảng viên bạn muốn review</h2>
            <p>Tìm kiếm và chọn giảng viên mà bạn muốn review</p>
            <TeacherSelector
              selectedTeacher={selectedTeacher}
              onTeacherSelect={onTeacherSelect}
              onNext={onNextStep}
              onBack={onBackToTeachers}
              showButtons={true}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-2-content">
            <h2>Thông tin môn học</h2>
            <p>Chọn học kỳ và môn học mà bạn đã học với giảng viên này</p>

            {selectedTeacher?.id && (
              <div className="selected-teacher-info">
                <h3>Giảng viên đã chọn: {selectedTeacher.name}</h3>
              </div>
            )}

            <div className="course-form">
              <div className="form-group">
                <label>Học kỳ</label>
                <div className="custom-dropdown">
                  <div
                    className="dropdown-trigger"
                    onClick={() =>
                      setIsSemesterDropdownOpen(!isSemesterDropdownOpen)
                    }
                  >
                    {selectedSemester
                      ? semesterOptions.find(
                          (opt) => opt.value === selectedSemester
                        )?.label
                      : "Chọn học kỳ"}
                    <svg
                      className={`dropdown-arrow ${
                        isSemesterDropdownOpen ? "open" : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                  {isSemesterDropdownOpen && (
                    <div className="dropdown-menu">
                      {semesterOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`dropdown-option ${
                            selectedSemester === option.value ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedSemester(option.value);
                            setIsSemesterDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Môn học</label>
                <div className="custom-dropdown">
                  <div
                    className="dropdown-trigger"
                    onClick={() =>
                      setIsCourseDropdownOpen(!isCourseDropdownOpen)
                    }
                  >
                    {selectedCourse
                      ? courseOptions.find(
                          (opt) => opt.value === selectedCourse
                        )?.label
                      : "Chọn môn học"}
                    <svg
                      className={`dropdown-arrow ${
                        isCourseDropdownOpen ? "open" : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                  {isCourseDropdownOpen && (
                    <div className="dropdown-menu">
                      {courseOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`dropdown-option ${
                            selectedCourse === option.value ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedCourse(option.value);
                            setIsCourseDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Mã lớp</label>
                <input
                  type="text"
                  placeholder="Ví dụ: SE1801"
                  className="form-input"
                />
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-back" onClick={() => onStepChange(1)}>
                Quay lại
              </button>
              <button className="btn-next" onClick={() => onStepChange(3)}>
                Tiếp theo
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-3-content">
            <h2>Review chi tiết</h2>
            <p>Chia sẻ trải nghiệm của bạn về giảng viên này</p>

            <div className="review-form"></div>

            <div className="step-actions">
              <button className="btn-back" onClick={() => onStepChange(2)}>
                Quay lại
              </button>
              <button
                className="btn-submit"
                onClick={() => {
                  // Handle review submission
                  alert("Review đã được gửi thành công!");
                }}
              >
                Gửi review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSteps;
