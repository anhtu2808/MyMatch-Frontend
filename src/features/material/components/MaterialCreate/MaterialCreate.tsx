import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  getCoursesAPI,
  getAllLecturerAPI,
  createMaterialAPI,
  uploadMaterialAPI,
} from "../../apis/MaterialPageAPIs";
import "./MaterialCreate.css";
import Notification from "../../../../components/notification/Notification";
import ConfirmDelete from "../../../../components/confirm-delete/ConfirmDelete";

export default function MaterialCreatePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // State cho form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [materialItemIds, setMaterialItemIds] = useState<number[]>([]);

  // Course state
  const [courseOptions, setCourseOptions] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | string>("");

  // Lecturer state
  const [lecturerOptions, setLecturerOptions] = useState<any[]>([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | string>(
    ""
  );
  const [lecturerLoading, setLecturerLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);

  // Load course list
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await getCoursesAPI({
          universityId: 1,
          page: 1,
          size: 50,
          sort: "name",
        });
        const data = res.content || res.result?.data || [];
        setCourseOptions(
          data.map((c: any) => ({
            value: String(c.id),
            label: `${c.code} - ${c.name}`,
          }))
        );
      } catch (e) {
        console.error("Lỗi load courses:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Load lecturers
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        setLecturerLoading(true);
        const res = await getAllLecturerAPI({
          page: 1,
          size: 100,
          sort: "name",
        });
        const data = res.result?.data || [];
        setLecturerOptions(
          data.map((l: any) => ({
            value: String(l.id),
            label: `${l.name} (${l.code})`,
          }))
        );
      } catch (e) {
        console.error("Lỗi load lecturers:", e);
      } finally {
        setLecturerLoading(false);
      }
    };
    fetchLecturers();
  }, []);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
  if (selectedFiles.length === 0) return;

  // Kiểm tra size
  const oversized = selectedFiles.find((f) => f.size > MAX_FILE_SIZE);
  if (oversized) {
    setNotification({ message: `File ${oversized.name} vượt quá dung lượng tối đa 5MB`, type: "error" });
    return;
  }

    try {
      const uploadedIds: number[] = [];
      for (const f of selectedFiles) {
        const res = await uploadMaterialAPI(f.name, f);
        const uploadedId = res.result?.id;
        if (uploadedId) uploadedIds.push(uploadedId);
      }

      setFiles((prev) => [...prev, ...selectedFiles]);
      setMaterialItemIds((prev) => [...prev, ...uploadedIds]);
      setNotification({ message: "Upload file thành công!", type: "success" });
    } catch (err) {
      console.error("Upload file lỗi:", err);
      setNotification({ message: "Upload file thất bại!", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialItemIds.length || !selectedCourseId || !selectedLecturerId || !name) {
      setNotification({ message: "Vui lòng nhập đầy đủ thông tin!", type: "error" });
      return;
    }
    console.log({
  name,
  description,
  courseId: Number(selectedCourseId),
  lecturerId: Number(selectedLecturerId),
  materialItemIds: materialItemIds.filter(Boolean),
});


    try {
  const res = await createMaterialAPI(
    name,
    description,
    Number(selectedCourseId),
    Number(selectedLecturerId),
    materialItemIds.filter(Boolean)
  );
    setNotification({ message: "Tạo tài liệu thành công!", type: "success" });
    navigate("/material");
  } catch (err) {
    console.error("Tạo tài liệu thất bại:", err);
    setNotification({ message: "Tạo tài liệu thất bại!", type: "error" });
  }
  };

  const handleDeleteFile = (index: number) => {
    setFileToDeleteIndex(index);
  };

  const confirmDeleteFile = () => {
    if (fileToDeleteIndex !== null) {
      const newFiles = [...files];
      newFiles.splice(fileToDeleteIndex, 1);
      setFiles(newFiles);

      const newIds = [...materialItemIds];
      newIds.splice(fileToDeleteIndex, 1);
      setMaterialItemIds(newIds);

      setNotification({ message: "Xóa file thành công", type: "success" });
      setFileToDeleteIndex(null);
    }
  };

  const handleRemoveFile = (index: number) => {
  setFiles((prev) => prev.filter((_, i) => i !== index));
  setMaterialItemIds((prev) => prev.filter((_, i) => i !== index));
  };

 
  const isFormValid = name && files.length > 0 && selectedCourseId && selectedLecturerId;

  return (
    <div className="material-create-container p-6">
      <h1 className="material-create-title text-xl font-bold mb-4">
        Thêm tài liệu mới
      </h1>

      <form onSubmit={handleSubmit} className="material-create-form space-y-4">
        <label className="material-create-label block mb-1 font-medium">
          Tên tài liệu <span className="textt-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Tên tài liệu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="material-create-input border rounded px-3 py-2 w-full"
          multiple   
        />

        <label className="material-create-label block mb-1 font-medium">
          Mô tả tài liệu <span className="textt-red-500">*</span>
        </label>
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="material-create-textarea border rounded px-3 py-2 w-full"
        />

        {/* Course Select */}
        <div className="material-create-course">
          <label className="material-create-label block mb-1 font-medium">
            Môn học <span className="textt-red-500">*</span>
          </label>
          <Select
            className="material-create-select"
            options={courseOptions}
            isLoading={loading}
            isSearchable
            isClearable
            placeholder="-- Chọn môn học --"
            value={
              courseOptions.find(
                (opt) => opt.value === String(selectedCourseId)
              ) || null
            }
            onChange={(opt) =>
              setSelectedCourseId(opt ? Number(opt.value) : "")
            }
            styles={{
              menu: (provided) => ({
                ...provided,
                width: "100%",
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: 200,
                overflowY: "auto",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#3B5999"
                  : state.isFocused
                  ? "#D9DADB"
                  : "white",
                color: state.isSelected ? "white" : "black",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        {/* Lecturer Select */}
        <div className="material-create-lecturer">
          <label className="material-create-label block mb-1 font-medium">
            Giảng viên <span className="textt-red-500">*</span>
          </label>
          <Select
            className="material-create-select"
            options={lecturerOptions}
            isLoading={lecturerLoading}
            isSearchable
            isClearable
            placeholder="-- Chọn giảng viên --"
            value={
              lecturerOptions.find(
                (opt) => opt.value === String(selectedLecturerId)
              ) || null
            }
            onChange={(opt) =>
              setSelectedLecturerId(opt ? Number(opt.value) : "")
            }
            styles={{
              menu: (provided) => ({
                ...provided,
                maxHeight: 200,
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: 200,
                overflowY: "auto",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#3B5999"
                  : state.isFocused
                  ? "#D9DADB"
                  : "white",
                color: state.isSelected ? "white" : "black",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        <label className="material-create-label block mb-1 font-medium">File <span className="text-red-500">*</span></label>
        <div className="material-create-file-container">
          <input type="file" id="fileInput" onChange={handleFileChange} multiple className="material-create-file-input" />
          <div className="preview-list flex gap-4 mt-2 flex-wrap">
            {files.map((f, i) => (
              <div key={i} className="preview-item border p-2 rounded bg-gray-100 relative">
                <p className="text-sm">{f.name}</p>
              </div>
            ))}
          </div>
        </div>


        <button
          type="submit"
          disabled={!isFormValid}
          className={`material-create-button rounded px-4 py-2 
    ${
      isFormValid
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
        >
          Tạo tài liệu
        </button>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {fileToDeleteIndex !== null && (
        <ConfirmDelete
          open={true}
          onConfirm={confirmDeleteFile}
          onCancel={() => setFileToDeleteIndex(null)}
          title="Xác nhận xóa file"
          content="Bạn có chắc chắn muốn xóa file này không?"
          okText="Xóa"
        />
      )}
    </div>
  );
}
