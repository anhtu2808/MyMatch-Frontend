import React, { useState } from "react";
import { useEffect } from "react";
import TeacherSelector from "../TeacherSelector/TeacherSelector";
import { useLocation, Location, useNavigate } from "react-router-dom";
import "./ReviewSteps.css";
import Notification from "../../../../components/notification/Notification";
import {
  getSemestersByUniversityAPI,
  getCoursesAPI,
  createReviewAPI,
} from "../../apis/TeacherPageApis";
import { Select, Input } from "antd";
import ReviewForm from "../ReviewCreteria/ReviewCreteria";

const { Option } = Select;

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

interface ReviewLocationState {
  teacherId: number;
  teacherName: string;
  teacherCode: string;
}

const ReviewSteps: React.FC<ReviewStepsProps> = ({
  currentStep,
  selectedTeacher,
  onStepChange,
  onTeacherSelect,
  onNextStep,
  onBackToTeachers,
}) => {
  const location = useLocation() as Location & { state: ReviewLocationState };
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [semesterOptions, setSemesterOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [courseOptions, setCourseOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [classCode, setClassCode] = useState("");
  const [reviewData, setReviewData] = useState<any>(null);
  const [isReviewFormValid, setIsReviewFormValid] = useState(false);
   const isStep2Valid =
    selectedSemester !== "" && selectedCourse !== "" ;
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

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

  // const isReviewValid = (reviewData: any) => {
  //   if (!reviewData) return false;

  //   if (!reviewData.answers || Object.keys(reviewData.answers).length === 0) {
  //     return false;
  //   }

  //   for (const value of Object.values(reviewData.answers)) {
  //     if (
  //       value === null ||
  //       value === undefined ||
  //       (typeof value === "string" && value.trim() === "")
  //     ) {
  //       return false;
  //     }
  //   }
    // if (!reviewData.evidenceUrl || reviewData.evidenceUrl.trim() === "") {
    //   return false;
    // }

  //   return true;
  // };

  const handleReviewFormChange = ({ data, isValid }: { data: any; isValid: boolean }) => {
  setReviewData(data);
  setIsReviewFormValid(isValid);
};

  useEffect(() => {
    const universityId = 1;

    // Load semesters
    getSemestersByUniversityAPI(universityId).then((res) => {
      const options = res.result.map((s: any) => ({
        value: String(s.id),
        label: s.name,
      }));
      setSemesterOptions(options);
    });

    // Load courses
    getCoursesAPI({ universityId, page: 1, size: 50, sort: "code" }).then(
      (res) => {
        const options = res.result.data.map((c: any) => ({
          value: String(c.id),
          label: `${c.code} - ${c.name}`,
        }));
        setCourseOptions(options);
      }
    );
  }, []);

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
                <Select
                  showSearch
                  placeholder="Chọn học kỳ..."
                  value={selectedSemester || undefined}
                  onChange={(value) => setSelectedSemester(value)}
                  filterOption={(input, option) =>
                    (option?.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={semesterOptions}
                />
              </div>

              <div className="form-group">
                <label>Môn học</label>
                <Select
                  showSearch
                  placeholder="Mã hoặc tên môn học..."
                  value={selectedCourse || undefined}
                  onChange={(value) => setSelectedCourse(value)}
                  filterOption={(input, option) =>
                    (option?.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={courseOptions}
                />
              </div>

              {/* <div className="form-group">
                <label>Mã lớp</label>
                <Input
                  placeholder="Ví dụ: SE1801"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
              </div> */}
            </div>

            <div className="step-actions">
              <button className="btn-back" onClick={() => onStepChange(1)}>
                Quay lại
              </button>
              <button
                className="btn-next"
                onClick={() => onStepChange(3)}
                 disabled={!isStep2Valid}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-3-content">
            <h2>Review chi tiết</h2>
            <p>Chia sẻ trải nghiệm của bạn về giảng viên này</p>
            <div className="review-form">
               <ReviewForm onChange={handleReviewFormChange} />
            </div>

            {/* Step actions */}
            <div className="step-actions">
              <button className="btn-back" onClick={() => onStepChange(2)}>
                Quay lại
              </button>
              <button
                className="btn-submit"
                 disabled={!isReviewFormValid}
                onClick={async () => {
                  if (!selectedTeacher) {
                    setNotification({
                      message: "Bạn chưa chọn giảng viên",
                      type: "warning",
                    });
                    return;
                  }

                  try {
                    const payload = {
                      lecturerId: Number(selectedTeacher?.id) || 0,
                      courseId: Number(selectedCourse) || 0,
                      semesterId: Number(selectedSemester) || 0,
                      isAnonymous: reviewData?.isAnonymous ?? false,
                      evidenceUrl: reviewData?.evidenceUrl || "string",
                      details: Object.entries(reviewData?.answers || {}).map(
                        ([criteriaId, value]) => {
                          const id = Number(criteriaId);

                          if (typeof value === "number") {
                            return {
                              criteriaId: id,
                              score: value,
                              comment: "",
                              isYes: false,
                            };
                          }

                          if (value === "yes" || value === "no") {
                            return {
                              criteriaId: id,
                              score: 0,
                              comment: "",
                              isYes: value === "yes",
                            };
                          }

                          if (typeof value === "string") {
                            return {
                              criteriaId: id,
                              score: 0,
                              comment: value || "",
                              isYes: false,
                            };
                          }

                          return {
                            criteriaId: id,
                            score: 0,
                            comment: "",
                            isYes: false,
                          };
                        }
                      ),
                    };

                    await createReviewAPI(payload);

                    setNotification({
                      message: "Review đã được gửi thành công!",
                      type: "success",
                    });
                  } catch (err) {
                    console.error("Error creating review:", err);
                    setNotification({
                      message: "Có lỗi khi gửi review, vui lòng thử lại!",
                      type: "error",
                    });
                  }
                }}
              >
                Gửi review
              </button>
            </div>
          </div>
        )}
      </div>
      {notification && (
  <Notification
    message={notification.message}
    type={notification.type}
    onClose={() => {
      const type = notification.type; // lưu type hiện tại
      setNotification(null);
      if (type === "success" && selectedTeacher) {
        navigate(`/lecturer-detail/${selectedTeacher.id}`);
      }
    }}
  />
)}

    </div>
  );
  
};

export default ReviewSteps;
