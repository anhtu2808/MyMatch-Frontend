import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import "./ProfileModalForm.css";
import { createProfile, getCourseAPI, getProfileId, getSemesterAPI, getSkillAPI, updateProfile } from "../../apis";
import { useAppSelector } from "../../../../store/hooks";
import Notification from "../../../../components/notification/Notification";
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

const ProfileModalForm: React.FC<UserProfileModalProps> = ({ open, onClose, id ,isEdit, onReload}) => {
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
  const [semesters, setSemesters] = useState<any[]>([]);
  const [noti, setNoti] = useState<{ message: string; type: any } | null>(null);

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

    const skillOptions = skills.map(skill => ({
      label: skill.name,
      value: skill.id,
    }));

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await getCourseAPI(1, 100)
          setCourses(response?.result?.data || [])
        } catch (error) {
          console.error('Error fetching campuses:', error)
        }
      }
      fetchCourses()
    }, []);

    const courseOptions = courses.map(course => ({
      label: `${course.code} - ${course.name}`, // hiển thị đẹp hơn
      value: course.id,
    }));

    useEffect(() => {
        const fetchSemeters = async () => {
          try {
            const response = await getSemesterAPI()
            setSemesters(response?.result || []);
          } catch (error: any) {
          console.error("Error fetching semester:", error);
          }
        };
        fetchSemeters();
      }, []);

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
  if (open && !isEdit) {  
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
        status: "OPEN",
      });
      onReload?.()
      showNotification("Cập nhật thành công", "success")
    } else {
      await createProfile(profileForm);
      onReload?.()
      showNotification("Tạo thành công", "success")
    }
    onReload?.();
    onClose();
  } catch (err: any) {
    showNotification(err?.response?.data?.message || "Thất bại", "error")
  }
};

  const handleInputChange = (field: string, value: any) => {
  setProfileForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const showNotification = (msg: string, type: any) => {
    setNoti({ message: msg, type });
  };

  return (
    <>
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
          <h2>Thông tin hồ sơ cá nhân</h2>
          <p>Đăng profile của bạn để tìm nhóm phù hợp</p>
          <p className="profile-form-modal-required">* Vui lòng nhập đầy đủ thông tin</p>
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
                {semesters.map((semester) => (
                <Option key={semester.id} value={semester.id}>
                  {semester?.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Skills */}
        <div className="profile-form-section">
          <h4>Kỹ năng</h4>
          <Select
            mode="multiple"
            showSearch
            allowClear
            placeholder="Chọn kỹ năng..."
            style={{ width: "100%" }}
            value={profileForm.skillIds}
            onChange={(values) => handleInputChange("skillIds", values)}
            options={skillOptions}
            optionFilterProp="label"  // lọc theo label (tên kỹ năng)
          />
        </div>

        {/* Courses */}
        <div className="profile-form-section">
          <h4>Môn học và mục tiêu điểm</h4>
          <div className="profile-form-two-cols">
            <Select
              showSearch
              allowClear
              placeholder="Chọn môn học..."
              style={{ width: '100%' }}
              value={profileForm.courseId}
              onChange={(value) => handleInputChange('courseId', value)}
              options={courseOptions}
              optionFilterProp="label"  // tìm kiếm theo label
            />
            <Input placeholder="Mục tiêu mấy điểm" 
            value={profileForm.goal}
            type="number"
            onChange={(e) => handleInputChange("goal", Number(e.target.value))}
            />
          </div>
        </div>

             {!isEdit && (
              <p className="profile-form-fee-warning">
                Mỗi lượt tạo sẽ mất phí <strong>3.000 Coin</strong>
              </p>
            )}
            
        {/* Footer */}
        <div className="profile-form-modal-footer">
          <button className="profile-form-button-cancel" onClick={onClose}>Hủy</button>
          <button className="profile-form-button-create" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </Modal>
    {noti && (
        <Notification
          message={noti.message}
          type={noti.type}
          onClose={() => setNoti(null)}
        />
      )}
      </>
  );
};

export default ProfileModalForm;
