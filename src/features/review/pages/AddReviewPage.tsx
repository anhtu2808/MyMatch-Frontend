import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import ReviewSteps from "../components/ReviewSteps/ReviewSteps";
import "./AddReviewPage.css";

interface Teacher {
  id: string;
  name: string;
  code: string;
}

interface LocationState {
  teacherId?: string;
  teacherName?: string;
  teacherCode?: string;
}

function AddReviewPage() {
  const { teacherId } = useParams<{ teacherId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Always start at step 1 unless teacher is pre-selected
  const [currentStep, setCurrentStep] = useState(() => {
    if (teacherId || state?.teacherId) {
      return 2; // Skip to step 2 if teacher is pre-selected
    }
    return 1; // Start at step 1 for teacher selection
  });

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(() => {
    if (teacherId || state?.teacherId) {
      return {
        id: teacherId || state?.teacherId || "",
        name: state?.teacherName || "Giảng viên được chọn",
        code: state?.teacherCode || "",
      };
    }
    return null;
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleTeacherSelect = (teacher: Teacher | null) => {
    setSelectedTeacher(teacher);
    // Don't auto advance to step 2 - wait for user confirmation
  };

  const handleNextStep = () => {
    if (selectedTeacher) {
      setCurrentStep(2);
      // Update URL to include selected teacher ID
      navigate(`/add-review/${selectedTeacher.code}`, {
        state: {
          teacherId: selectedTeacher.id,
          teacherName: selectedTeacher.name,
          teacherCode: selectedTeacher.code,
        },
        replace: true,
      });
    }
  };

  const handleBackToTeachers = () => {
    // Navigate back to teachers page
    navigate("/teachers");
  };

  return (
    <div className="add-review-page-container">
      <Sidebar />
      <Header
        title="Thêm review giảng viên"
        script="Chia sẻ trải nghiệm của bạn để giúp các sinh viên khác"
      />
      <div className="add-review-content">
        {/* Debug info */}
        {/* <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #0C326F'
        }}>
          <h3>Debug Info:</h3>
          <p>Teacher ID: {teacherId}</p>
          <p>Teacher Name: {selectedTeacher.name}</p>
          <p>Current Step: {currentStep}</p>
          <p>Page loaded successfully!</p>
        </div> */}

        <ReviewSteps
          currentStep={currentStep}
          selectedTeacher={selectedTeacher}
          onStepChange={handleStepChange}
          onTeacherSelect={handleTeacherSelect}
          onNextStep={handleNextStep}
          onBackToTeachers={handleBackToTeachers}
        />
      </div>
    </div>
  );
}

export default AddReviewPage;
