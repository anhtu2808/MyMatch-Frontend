import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import "./ProfileModalForm.css";
import { createProfile, getCourseAPI, getProfileId, getSkillAPI, updateProfile } from "../../apis";
import { useAppSelector } from "../../../../store/hooks";
const { TextArea } = Input;
const { Option } = Select
interface ProfileForm {
  requestDetail: string;
  goal: number;
  classCode: string;
  description: string;
  courseId?: number;
  semesterId?: number;
  campusId?: number;
  skillIds: number[];
}

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
  id?: number;
  isEdit?: boolean;
  onReload?: () => void
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ open, onClose, id ,isEdit, onReload}) => {
  const user = useAppSelector((state) => state.user)
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    requestDetail: "",
    goal: 0,
    classCode: "",
    description: "",
    courseId: undefined,
    semesterId: undefined,
    campusId: Number(user?.campusId),
    skillIds: [] as number[],
    })
  const [skills, getSkills] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  

    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const response = await getSkillAPI()
          getSkills(response?.result|| [])
        } catch (error) {
          console.error('Error fetching campuses:', error)
        }
      }
      fetchSkills()
    }, [])

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await getCourseAPI()
          setCourses(response?.result?.data || [])
        } catch (error) {
          console.error('Error fetching campuses:', error)
        }
      }
      fetchCourses()
    }, [])

    useEffect(() => {
    const fetchProfileDetail = async () => {
    if (isEdit && id) {
      try {
        const res = await getProfileId(id); // API lấy chi tiết profile
        setProfileForm({
          requestDetail: res?.result?.requestDetail,
          goal: res?.result?.goal,
          classCode: res?.result?.classCode,
          description: res?.result?.description,
          courseId: res?.result?.course?.id,
          semesterId: res?.result?.semester?.id,
          campusId: res?.result?.campus?.id,
          skillIds: res?.result?.skills?.map((s: any) => s.skill.id) || [],
        });
      } catch (err) {
        console.error("Lỗi fetch profile detail:", err);
      }
    }
  };
  fetchProfileDetail();
}, [isEdit, id]);

useEffect(() => {
  if (open && !isEdit) {  // nếu ko edit thì khi mở modal sẽ được reset các field
    setProfileForm({
      requestDetail: "",
      goal: 0,
      classCode: "",
      description: "",
      courseId: undefined,
      semesterId: undefined,
      campusId: Number(user?.campusId),
      skillIds: []
    });
  }
}, [open, isEdit, user]);

  const handleSave = async () => {
  try {
    if (isEdit && id) {
      await updateProfile(id, {
        ...profileForm,
        status: "OPEN", // theo body yêu cầu
      });
      onReload?.()
    } else {
      await createProfile(profileForm);
      onReload?.()
    }
    onReload?.();
    onClose();
  } catch (error) {
    console.error("Lỗi khi lưu profile:", error);
  }
};

  const handleInputChange = (field: string, value: any) => {
  setProfileForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      title={null}
    >
      <div className="profile-form-modal">
        {/* Header */}
        <div className="profile-form-modal-header">
          <h2>Thông tin profile</h2>
          <p>Đăng profile của bạn để tìm nhóm phù hợp</p>
        </div>

        {/* Basic Info */}
        <div className="profile-form-section">
          <h4>Thông tin cơ bản</h4>
          <div className="profile-form-two-cols">
            <Input placeholder="Lớp" 
            value={profileForm.classCode}
            onChange={(e) => handleInputChange("classCode", e.target.value)}
            />
          </div>
          <div className="profile-form-input">
            <Input  placeholder="Tiêu đề"
            value={profileForm.requestDetail}
            onChange={(e) => handleInputChange("requestDetail", e.target.value)}
            />
            <TextArea autoSize placeholder="Mô tả về bản thân (kĩ năng, vị trí, ngôn ngữ,...)" 
            value={profileForm.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>

        {/* Information */}
        <div className="profile-form-section"> 
          <h4>Học kỳ</h4>
          <div className="profile-form-info">
            <Select
            placeholder="Kỳ học"
            style={{ width: '100%' }}
              value={profileForm.semesterId}
              onChange={(value) => handleInputChange('semesterId', value)}
            >
                <Option value="1">1</Option>
                {/* <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option> */}
            </Select>
          </div>
        </div>

        {/* Skills */}
        <div className="profile-form-section">
          <h4>Kỹ năng</h4>
          <Select
            mode="multiple"                  
            style={{ width: "100%" }}
            placeholder="Có thể chọn nhiều kỹ năng"
            value={profileForm.skillIds}
            onChange={(values) => {
              if (values.length) {        
                handleInputChange("skillIds", values);
              }
            }}
          >
            {skills.map((skill) => (
              <Select.Option key={skill.id} value={skill.id}>
                {skill.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Courses */}
        <div className="profile-form-section">
          <h4>Môn học và mục tiêu điểm</h4>
          <div className="profile-form-two-cols">
            <Select
              value={profileForm.courseId || undefined}
              onChange={(value) => handleInputChange('courseId', value)}
              placeholder='Môn học'
              style={{ width: '100%' }}
            >
                {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course?.code}
                </Option>
              ))}
            </Select>
            <Input placeholder="Mục tiêu mấy điểm" 
            value={profileForm.goal}
            type="number"
            onChange={(e) => handleInputChange("goal", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="profile-form-modal-footer">
          <button className="profile-form-button-cancel" onClick={onClose}>Hủy</button>
          <button className="profile-form-button-create" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
