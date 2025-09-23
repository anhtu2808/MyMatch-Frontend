import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  getCoursesAPI,
  getAllLecturerAPI,
  createMaterialAPI,
} from "../../apis/MaterialPageAPIs";
import "./MaterialCreate.css";

export default function MaterialCreatePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // State cho form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Course state
  const [courseOptions, setCourseOptions] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | string>("");

  // Lecturer state
  const [lecturerOptions, setLecturerOptions] = useState<any[]>([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | string>(
    ""
  );
  const [lecturerLoading, setLecturerLoading] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File vượt quá dung lượng tối đa 5MB");
        e.target.value = ""; // reset input file
        return;
      }
      setFile(selectedFile);
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedCourseId || !selectedLecturerId || !name) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await createMaterialAPI({
        name,
        description,
        courseId: Number(selectedCourseId),
        lecturerId: Number(selectedLecturerId),
        file,
      });
      console.log("Material created:", res);
      alert("Tạo tài liệu thành công!");

      // Reset form
      setName("");
      setDescription("");
      setFile(null);
      setSelectedCourseId("");
      setSelectedLecturerId("");
      navigate("/material");
    } catch (err) {
      console.error("Tạo tài liệu thất bại:", err);
      alert("Tạo tài liệu thất bại!");
    }
  };

  // Kiểm tra form đủ dữ liệu chưa
  const isFormValid = name && file && selectedCourseId && selectedLecturerId;

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

        <label className="material-create-label block mb-1 font-medium">
          File <span className="textt-red-500">*</span>
        </label>

        <div className="material-create-file-container">
          <div className="upload-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-upload"
            >
              <path d="M12 3v12" />
              <path d="m17 8-5-5-5 5" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            </svg>
          </div>
          <div className="upload-text">
            {file ? (
              <p>
                <strong>File đã chọn:</strong> {file.name}
              </p>
            ) : (
              <>
                <p>
                  <strong>Chọn tệp</strong> hoặc kéo thả vào đây
                </p>
                <p className="upload-subtext">
                  Hỗ trợ PDF, DOC, DOCX, PPT, PPTX tối đa 5MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="material-create-file-input"
          />
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
    </div>
  );
}
