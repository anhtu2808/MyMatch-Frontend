import React, { useEffect, useState } from "react";
import { Modal, Button, Tag, Input, Select } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "./GroupModalForm.css";
import { createGroup, getCourseAPI, getGroupId, getSkillAPI, updateGroup } from "../../apis";
import { useAppSelector } from "../../../../store/hooks";
const { Option } = Select

interface MemberForm {
  id?: number;  
  name: string;
  note: string;
  skillIds: number[];
}

interface teamRequestForm {
   id?: number;  
  title: string;
  description: string;
  urgency: string;
  skillIds: number[];
}

interface GroupForm {
  name: string,
  memberMax: number,
  description: string,
  semesterId: number,
  campusId: number,
  courseId: number,
  members: MemberForm[],
  teamRequest: teamRequestForm[]
}
interface GroupDetailModalProps {
  open: boolean;
  onClose: () => void;
  id?: number;
  isEdit?: boolean;
}

const GroupDetailModalChange: React.FC<GroupDetailModalProps> = ({open, onClose, id, isEdit}) => {
  const user = useAppSelector((state) => state.user)
  console.log("studentId", user?.studentId);
  const [groupInfo, setGroupInfo] = useState<GroupForm>({
  name: "",
  memberMax: 0,
  description: "",
  semesterId: 0,
  campusId: Number(user?.campusId),
  courseId: 0,
  teamRequest: [
    {
      title: "",
      description: "",
      skillIds: [] as number[],
      urgency: "NORMAL"
    }
  ],
  members: [
    {
      name: "",
      note: "",
      skillIds: [] as number[],
    }
  ]
});

useEffect(() => {
  if (open && !isEdit) {  // nếu ko edit thì khi mở modal sẽ được reset các field
    setGroupInfo({
      name: "",
      memberMax: 0,
      description: "",
      semesterId: 0,
      campusId: Number(user?.campusId),
      courseId: 0,
      teamRequest: [
        {
          title: "",
          description: "",
          skillIds: [] as number[],
          urgency: "NORMAL"
        }
      ],
      members: [
        {
          name: "",
          note: "",
          skillIds: [] as number[],
        }
      ]
    });
  }
}, [open, isEdit, user]);

  const [courses, setCourses] = useState<any[]>([])
  const [skills, getSkills] = useState<any[]>([])
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


  // === Member actions ===
  const addMember = () => {
  setGroupInfo(prev => ({
    ...prev,
    members: [...prev.members, { name: "", note: "", skillIds: []}]
  }));
};

  const removeMember = (index: number) => {
  const member = groupInfo.members[index];
  if (member.id) {
    // gọi API xóa hoặc push vào 1 mảng deletedIds
    console.log("Xóa trên server:", member.id);
  }
  setGroupInfo(prev => ({
    ...prev,
    members: prev.members.filter((_, i) => i !== index)
  }));
};

  const updateMember = (index: number, field: keyof MemberForm, value: any) => {
  const newMembers = [...groupInfo.members];
  newMembers[index] = { ...newMembers[index], [field]: value };
  setGroupInfo({ ...groupInfo, members: newMembers });
};

  // === teamRequest actions ===
  const addTeamRequest = () => {
  setGroupInfo(prev => ({
    ...prev,
    teamRequest: [...prev.teamRequest, { title: "", description: "", skillIds: [], urgency: "NORMAL" }]
  }));
};

  const removeTeamRequest = (index: number) => {
  setGroupInfo(prev => ({
    ...prev,
    teamRequest: prev.teamRequest.filter((_, i) => i !== index)
  }));
};

  const updateTeamRequest = (index: number, field: keyof teamRequestForm, value: any) => {
  const newPositions = [...groupInfo.teamRequest];
  newPositions[index] = { ...newPositions[index], [field]: value };
  setGroupInfo({ ...groupInfo, teamRequest: newPositions });
};

  const handleSave = async () => {
  try {
    console.log("Payload gửi API:", groupInfo);

    if (isEdit && id) {
      await updateGroup(id, groupInfo);
      console.log("Group updated!");
    } else {
      await createGroup(groupInfo);
      console.log("Group created!");
    }

    onClose();
  } catch (err) {
    console.error("Lỗi lưu group:", err);
  }
};



  const handleInputChange = (field: string, value: any) => {
  setGroupInfo((prev) => ({
    ...prev,
    [field]: value,
  }));
};

useEffect(() => {
  if (isEdit && id) {
    const fetchGroup = async () => {
      try {
        const response = await getGroupId(id);
        const group = response.result;

        // Map dữ liệu API sang state GroupForm
        setGroupInfo({
          name: group.name,
          memberMax: group.memberMax,
          description: group.description,
          semesterId: group.semester.id,
          campusId: group.campus.id,
          courseId: group.course.id,
          members: group.teamMember.map((tm: any) => ({
            id: tm.member.id,  
            name: tm.member.name,
            note: tm.member.note,
            skillIds: tm.member.skills?.map((s: any) => s.id) || [],
          })),
          teamRequest: group.teamRequest.map((tr: any) => ({
            id: tr.id,
            title: tr.title,
            description: tr.description,
            skillIds: tr.skills.map((s: any) => s.skill.id),
            urgency: "NORMAL"
          })),
        });
      } catch (err) {
        console.error("Error fetching group:", err);
      }
    };
    fetchGroup();
  }
}, [isEdit, id]);


  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title={null}
      centered
    >
      <div className="group-form-detail-modal">
        {/* Header */}
        <div className="group-form-modal-header">
          <h2>Thông tin nhóm</h2>
          <p>Đăng nhóm của bạn để tìm thành viên phù hợp</p>
        </div>

          <div className="group-form-section">
            <h4>Dự án nhóm</h4>
            <div className="group-form-project"> 
             <Input
                placeholder="Tên nhóm"
                value={groupInfo.name}
                onChange={(e) => handleInputChange("name",  e.target.value )}
              />
              <label htmlFor="">Số lượng thành viên</label>
              <Input
                placeholder="Số lượng thành viên"
                type="number"
                value={groupInfo.memberMax}
                onChange={(e) => handleInputChange("memberMax",  Number(e.target.value) )}
              />
              <Input.TextArea
                autoSize
                placeholder="Mô tả thêm về nhóm của bạn"
                value={groupInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              </div>
          </div>

        {/* Information */}
        <div className="group-form-section"> 
          <h4>Thông tin học tập</h4>
          <div className="group-form-info">
            <Select
              placeholder="Môn học"
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("courseId", value)}
            >
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course?.code}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Kỳ học"
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("semesterId",  value )}
            >
              <Option value="1">1</Option>
            </Select>
          </div>
        </div>

        {/* Members */}
          <div className="group-form-section">
            <h4>Thành viên hiện tại</h4>
            {groupInfo.members.map((m, index) => (
              <div key={index} className="group-form-member-item editable">
                <Input
                  placeholder="Tên thành viên"
                  style={{ width: "100%" }}
                  value={m.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                />
                <Input
                  placeholder="Vai trò"
                  style={{ width: "100%" }}
                  value={m.note}
                  onChange={(e) => updateMember(index, "note", e.target.value)}
                />
                <Select
                style={{ width: "30%" }}
                  mode="multiple"
                  placeholder="Kỹ năng (có thể chọn nhiều)"
                  value={m.skillIds}
                  onChange={(values) => updateMember(index, "skillIds", values)}
                >
                  {skills.map((skill) => (
                    <Option key={skill.id} value={skill.id}>{skill.name}</Option>
                  ))}
                </Select>
                <MinusCircleOutlined onClick={() => removeMember(index)} />
              </div>
            ))}
            <Button type="dashed" block icon={<PlusOutlined />} onClick={addMember}>
              Thêm thành viên
            </Button>
          </div>

          {/* teamRequest */}
          <div className="group-form-section">
            <h4>Đang tìm kiếm</h4>
            {groupInfo.teamRequest.map((pos, index) => (
              <div key={index} className="group-form-position-item editable">
                <Input
                  placeholder="Tên vị trí"
                  style={{ width: "100%" }}
                  value={pos.title}
                  onChange={(e) => updateTeamRequest(index, "title", e.target.value)}
                />
                <Input
                  placeholder="Mô tả"
                  style={{ width: "100%" }}
                  value={pos.description}
                  onChange={(e) => updateTeamRequest(index, "description", e.target.value)}
                />
                <Select
                  mode="multiple"
                  style={{ width: "30%" }}
                  placeholder="Kỹ năng (có thể chọn nhiều)"
                  value={pos.skillIds}
                  onChange={(values) => updateTeamRequest(index, "skillIds", values)}
                >
                  {skills.map((skill) => (
                    <Option key={skill.id} value={skill.id}>{skill.name}</Option>
                  ))}
                </Select>
                <MinusCircleOutlined onClick={() => removeTeamRequest(index)} />
              </div>
            ))}
            <Button type="dashed" block icon={<PlusOutlined />} onClick={addTeamRequest}>
              Thêm vị trí
            </Button>
          </div>

        {/* Footer */}
        <div className="group-form-modal-footer">
          <button className="group-form-button-cancel" onClick={onClose}>Đóng</button>
          <button className="group-form-button-create" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDetailModalChange;
