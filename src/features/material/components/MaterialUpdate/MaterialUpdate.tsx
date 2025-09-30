import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMaterialByIdAPI,
  updateMaterialAPI,
  getCoursesAPI,
  getAllLecturerAPI,
} from "../../apis/MaterialPageAPIs";
import "./UpdateMaterial.css";
import Notification from "../../../../components/notification/Notification";

export default function MaterialUpdatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState<string>("");

  const [courseOptions, setCourseOptions] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | string>("");

  const [lecturerOptions, setLecturerOptions] = useState<any[]>([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | string>(
    ""
  );
  const [lecturerLoading, setLecturerLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const material = await getMaterialByIdAPI(Number(id));
        setName(material.name);
        setDescription(material.description);
        setSelectedCourseId(material.course?.id || "");
        setSelectedLecturerId(material.lecturer?.id || "");
        // setExistingFileName(material.file?.name || "");

        const coursesRes = await getCoursesAPI({
          page: 1,
          size: 50,
          sort: "name",
        });
        const courses = coursesRes.content || coursesRes.result?.data || [];
        setCourseOptions(
          courses.map((c: any) => ({
            value: String(c.id),
            label: `${c.code} - ${c.name}`,
          }))
        );

        const lecturersRes = await getAllLecturerAPI({
          page: 1,
          size: 100,
          sort: "name",
        });
        const lecturers = lecturersRes.result?.data || [];
        setLecturerOptions(
          lecturers.map((l: any) => ({
            value: String(l.id),
            label: `${l.name} (${l.code})`,
          }))
        );
      } catch (err) {
        console.error(err);
        setNotification({ message: "Lấy dữ liệu tài liệu thất bại!", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedCourseId || !selectedLecturerId) {
      setNotification({ message: "Vui lòng nhập đầy đủ thông tin!", type: "warning" });
      return;
    }

    try {
      await updateMaterialAPI(Number(id), {
        name,
        description,
        courseId: Number(selectedCourseId),
        lecturerId: Number(selectedLecturerId),
        // file: file || null,
      });
      setNotification({ message: "Cập nhật tài liệu thành công!", type: "success" });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Cập nhật thất bại!", type: "error" });
    }
  };

  const isFormValid = name && selectedCourseId && selectedLecturerId;

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="material-update-container p-6">
      <h1 className="material-update-title text-xl font-bold mb-4">
        Cập nhật tài liệu
      </h1>
      <form onSubmit={handleSubmit} className="material-update-form space-y-4">
        <label className="material-update-label block mb-1 font-medium">
          Tên tài liệu <span className="textt-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Tên tài liệu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="material-update-input border rounded px-3 py-2 w-full"
        />

        <label className="material-update-label block mb-1 font-medium">
          Mô tả tài liệu
        </label>
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="material-update-textarea border rounded px-3 py-2 w-full"
        />

        <div className="material-update-course">
          <label className="material-update-label block mb-1 font-medium">
            Môn học <span className="textt-red-500">*</span>
          </label>
          <Select
            className="material-update-select"
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
          />
        </div>

        <div className="material-update-lecturer">
          <label className="material-update-label block mb-1 font-medium">
            Giảng viên <span className="textt-red-500">*</span>
          </label>
          <Select
            className="material-update-select"
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
          />
        </div>

        {/* <label className="material-update-label block mb-1 font-medium">
          File
        </label>
        <div className="material-update-file-container">
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
          </div> */}
        {/* <div className="upload-text">
            {file ? (
              <p>
                <strong>File đã chọn:</strong> {file.name}
              </p>
            ) : existingFileName ? (
              <p>
                <strong>File hiện tại:</strong> {existingFileName}
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
          </div> */}
        {/* <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="material-update-file-input"
          /> */}
        {/* </div> */}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`material-update-button rounded px-4 py-2 ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Cập nhật tài liệu
        </button>
      </form>
    </div>
  );
}
