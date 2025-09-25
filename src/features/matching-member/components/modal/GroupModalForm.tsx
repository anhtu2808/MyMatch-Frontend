import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "./GroupModalForm.css";
import {
  createGroup,
  getCourseAPI,
  getGroupId,
  getSkillAPI,
  updateGroup,
} from "../../apis";
import { useAppSelector } from "../../../../store/hooks";

const { Option } = Select;

// === Interfaces ===
interface MemberForm {
  id?: number; // id của member (dùng khi update thông tin)
  teamMemberId?: number; // id của teamMember (dùng khi xoá khỏi group)
  isNew?: boolean; // flag tạm để phân biệt
  name: string;
  note: string;
  skillIds: number[];
}

interface TeamRequestForm {
  id?: number;
  isNew?: boolean;
  title: string;
  description?: string;
  urgency?: string;
  skills: {
    id: number;
    skill: {
      id: number;
      name: string;
    };
  }[];
}

interface GroupForm {
  id?: number;
  name: string;
  memberMax: number;
  description: string;
  semesterId: number;
  campusId: number;
  courseId: number;
  members: MemberForm[];
  teamRequest: TeamRequestForm[];
}

// === Props ===
interface GroupDetailModalProps {
  open: boolean;
  onClose: () => void;
  id?: number;
  isEdit?: boolean;
}

const GroupDetailModalChange: React.FC<GroupDetailModalProps> = ({
  open,
  onClose,
  id,
  isEdit,
}) => {
  const user = useAppSelector((state) => state.user);

  const [groupInfo, setGroupInfo] = useState<GroupForm>({
    name: "",
    memberMax: 0,
    description: "",
    semesterId: 0,
    campusId: Number(user?.campusId),
    courseId: 0,
    teamRequest: [],
    members: [],
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<number[]>([]);
  const [deletedRequestIds, setDeletedRequestIds] = useState<number[]>([]);

  // Reset khi mở modal ở create mode
  useEffect(() => {
    if (open && !isEdit) {
      setGroupInfo({
        name: "",
        memberMax: 0,
        description: "",
        semesterId: 0,
        campusId: Number(user?.campusId),
        courseId: 0,
        teamRequest: [],
        members: [],
      });
      setDeletedMemberIds([]);
      setDeletedRequestIds([]);
    }
  }, [open, isEdit, user]);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseAPI();
        setCourses(response?.result?.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkillAPI();
        setSkills(response?.result || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  // === Member actions ===
  const addMember = () => {
    setGroupInfo((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { name: "", note: "", skillIds: [], isNew: true },
      ],
    }));
  };

  const removeMember = (index: number) => {
    const member = groupInfo.members[index];
    if (member.teamMemberId) {
      setDeletedMemberIds((prev) => [...prev, member.teamMemberId!]);
    }
    setGroupInfo((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const updateMember = (index: number, field: keyof MemberForm, value: any) => {
    const newMembers = [...groupInfo.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setGroupInfo({ ...groupInfo, members: newMembers });
  };

  // === teamRequest actions ===
  const addTeamRequest = () => {
    setGroupInfo((prev) => ({
      ...prev,
      teamRequest: [
        ...prev.teamRequest,
        {
          title: "",
          description: "",
          skills: [],
          urgency: "NORMAL",
          isNew: true,
        },
      ],
    }));
  };

  const removeTeamRequest = (index: number) => {
    const tr = groupInfo.teamRequest[index];
    if (tr.id) {
      setDeletedRequestIds((prev) => [...prev, tr.id!]);
    }
    setGroupInfo((prev) => ({
      ...prev,
      teamRequest: prev.teamRequest.filter((_, i) => i !== index),
    }));
  };

  const updateTeamRequest = (
    index: number,
    field: keyof TeamRequestForm,
    value: any
  ) => {
    const newRequests = [...groupInfo.teamRequest];
    newRequests[index] = { ...newRequests[index], [field]: value };
    setGroupInfo({ ...groupInfo, teamRequest: newRequests });
  };

  // === Payload ===
  const buildCreatePayload = (groupInfo: GroupForm) => ({
    name: groupInfo.name,
    memberMax: groupInfo.memberMax,
    description: groupInfo.description,
    semesterId: groupInfo.semesterId,
    campusId: groupInfo.campusId,
    courseId: groupInfo.courseId,
    image: "",
    teamRequest: groupInfo.teamRequest.map((tr) => ({
      title: tr.title,
      description: tr.description,
      skillIds: tr.skills?.map((s) => s.skill.id) || [],
      urgency: tr.urgency || "NORMAL",
    })),
    members: groupInfo.members.map((m) => ({
      memberId: m.id,
      name: m.name,
      note: m.note,
      image: "",
      skillIds: m.skillIds,
    })),
  });

  const buildUpdatePayload = (
  groupInfo: GroupForm,
  deletedMemberIds: number[],
  deletedRequestIds: number[]
) => ({
  name: groupInfo.name,
  memberMax: groupInfo.memberMax,
  description: groupInfo.description,
  semesterId: groupInfo.semesterId,
  campusId: groupInfo.campusId,
  courseId: groupInfo.courseId,
  image: "",

  // Team requests
  requestsToCreate: groupInfo.teamRequest
    .filter((tr) => tr.isNew)
    .map((tr) => ({
      title: tr.title,
      description: tr.description,
      skillIds: tr.skills?.map((s) => s.skill.id) || [],
      urgency: tr.urgency || "NORMAL",
    })),
  requestsToUpdate: groupInfo.teamRequest
    .filter((tr) => !tr.isNew && tr.id)
    .map((tr) => ({
      id: tr.id!,
      title: tr.title,
      description: tr.description,
      skillIds: tr.skills?.map((s) => s.skill.id) || [],
    })),
  requestIdsToDelete: deletedRequestIds,

  // Members
  newMembersToCreateAndAdd: groupInfo.members
    .filter((m) => m.isNew)
    .map((m) => ({
      memberId: m.id,   // chỉ gửi memberId khi thêm mới
      name: m.name,
      note: m.note,
      image: "",
      skillIds: m.skillIds,
    })),

  membersToUpdate: groupInfo.members
    .filter((m) => !m.isNew && m.teamMemberId)
    .map((m) => ({
      teamMemberId: m.teamMemberId!,  // dùng teamMemberId để update
      name: m.name,
      note: m.note,
      skillIds: m.skillIds,
    })),

  teamMemberIdsToRemove: deletedMemberIds,
});


  // === Handle save ===
  const handleSave = async () => {
    try {
      let payload;
      if (isEdit && id) {
        payload = buildUpdatePayload(groupInfo, deletedMemberIds, deletedRequestIds);
        await updateGroup(id, payload);
      } else {
        payload = buildCreatePayload(groupInfo);
        await createGroup(payload);
      }
      onClose();
    } catch (err) {
      console.error("Lỗi lưu group:", err);
    }
  };

  // === Load data khi edit ===
 useEffect(() => {
  if (isEdit && id) {
    const fetchGroup = async () => {
      try {
        const response = await getGroupId(id);
        const group = response.result;

        // Reset luôn mấy state phụ
        setDeletedMemberIds([]);
        setDeletedRequestIds([]);

        // Set groupInfo mới hoàn toàn
        setGroupInfo({
          id: group.id,
          name: group.name,
          memberMax: group.memberMax,
          description: group.description,
          semesterId: group.semester.id,
          campusId: group.campus.id,
          courseId: group.course.id,
          members: group.teamMember.map((tm: any) => ({
            id: tm.member.id,
            teamMemberId: tm.id,
            name: tm.member.name,
            note: tm.member.note,
            skillIds: tm.member.memberSkills.map((s: any) => s.skill.id),
            isNew: false,
          })),
          teamRequest: group.teamRequest.map((tr: any) => ({
            id: tr.id,
            title: tr.title,
            description: tr.description || "",
            urgency: tr.urgency,
            skills: tr.skills,
            isNew: false,
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
    <Modal open={open} onCancel={onClose} footer={null} width={800} centered>
      <div className="group-form-detail-modal">
        {/* Header */}
        <div className="group-form-modal-header">
          <h2>Thông tin nhóm</h2>
          <p>Đăng nhóm của bạn để tìm thành viên phù hợp</p>
        </div>

        {/* Project */}
        <div className="group-form-section">
          <h4>Dự án nhóm</h4>
          <div className="group-form-project">
            <Input
              placeholder="Tên nhóm"
              value={groupInfo.name}
              onChange={(e) => setGroupInfo({ ...groupInfo, name: e.target.value })}
            />
            <label>Số lượng thành viên</label>
            <Input
              type="number"
              placeholder="Số lượng thành viên"
              value={groupInfo.memberMax}
              onChange={(e) =>
                setGroupInfo({ ...groupInfo, memberMax: Number(e.target.value) })
              }
            />
            <Input.TextArea
              autoSize
              placeholder="Mô tả thêm về nhóm của bạn"
              value={groupInfo.description}
              onChange={(e) =>
                setGroupInfo({ ...groupInfo, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Study info */}
        <div className="group-form-section">
          <h4>Thông tin học tập</h4>
          <div className="group-form-info">
            <Select
              placeholder="Môn học"
              style={{ width: "100%" }}
              value={groupInfo.courseId || undefined}
              onChange={(value) => setGroupInfo({ ...groupInfo, courseId: value })}
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
              value={groupInfo.semesterId || undefined}
              onChange={(value) => setGroupInfo({ ...groupInfo, semesterId: value })}
            >
              <Option value={1}>1</Option>
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
                value={m.name}
                onChange={(e) => updateMember(index, "name", e.target.value)}
              />
              <Input
                placeholder="Vai trò"
                value={m.note}
                onChange={(e) => updateMember(index, "note", e.target.value)}
              />
              <Select
                mode="multiple"
                style={{ width: "40%" }}
                placeholder="Kỹ năng"
                value={m.skillIds}
                onChange={(values) => updateMember(index, "skillIds", values)}
              >
                {skills.map((skill) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
              <MinusCircleOutlined onClick={() => removeMember(index)} />
            </div>
          ))}
          <Button type="dashed" block icon={<PlusOutlined />} onClick={addMember}>
            Thêm thành viên
          </Button>
        </div>

        {/* Requests */}
        <div className="group-form-section">
          <h4>Đang tìm kiếm</h4>
          {groupInfo.teamRequest.map((pos, index) => (
            <div key={index} className="group-form-position-item editable">
              <Input
                placeholder="Tên vị trí"
                value={pos.title}
                onChange={(e) => updateTeamRequest(index, "title", e.target.value)}
              />
              <Input
                placeholder="Mô tả"
                value={pos.description}
                onChange={(e) => updateTeamRequest(index, "description", e.target.value)}
              />
              <Select
                mode="multiple"
                style={{ width: "40%" }}
                placeholder="Kỹ năng"
                value={pos.skills?.map((s) => s.skill.id) || []}
                onChange={(values) =>
                  updateTeamRequest(index, "skills", values.map((id: number) => ({ id, skill: { id, name: "" } })))
                }
              >
                {skills.map((skill) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
              <MinusCircleOutlined onClick={() => removeTeamRequest(index)} />
            </div>
          ))}
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={addTeamRequest}
          >
            Thêm vị trí
          </Button>
        </div>

        {/* Footer */}
        <div className="group-form-modal-footer">
          <button className="group-form-button-cancel" onClick={onClose}>
            Đóng
          </button>
          <button className="group-form-button-create" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDetailModalChange;
