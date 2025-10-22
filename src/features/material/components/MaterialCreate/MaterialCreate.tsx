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


const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const SpinnerIcon = () => (
    <svg className="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="4"></circle>
        <path className="opacity-75" fill="#60A5FA" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

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
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: 'uploading' | 'success' | 'error' }>({});

  const [price, setPrice] = useState<number | string>("");

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

  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        if (selectedFiles.length === 0) return;

        const oversized = selectedFiles.find((f) => f.size > MAX_FILE_SIZE);
        if (oversized) {
            setNotification({ message: `File ${oversized.name} vượt quá dung lượng tối đa 500MB`, type: "error" });
            return;
        }

        setFiles((prev) => [...prev, ...selectedFiles]);
        const initialProgress = selectedFiles.reduce((acc, file) => {
            acc[`${file.name}-${file.lastModified}`] = 'uploading';
            return acc;
        }, {} as { [key: string]: 'uploading' });
        setUploadProgress(prev => ({ ...prev, ...initialProgress }));

        let successCount = 0;
        const uploadPromises = selectedFiles.map(async (file) => {
            const fileKey = `${file.name}-${file.lastModified}`;
            try {
                const res = await uploadMaterialAPI(file.name, file);
                const uploadedId = res.result?.id;
                if (uploadedId) {
                    setUploadProgress(prev => ({ ...prev, [fileKey]: 'success' }));
                    successCount++;
                    return uploadedId;
                } else {
                    throw new Error("Upload failed, no ID returned");
                }
            } catch (err) {
                console.error(`Upload file ${file.name} lỗi:`, err);
                setUploadProgress(prev => ({ ...prev, [fileKey]: 'error' }));
                return null;
            }
        });

        const results = await Promise.all(uploadPromises);
        const newIds = results.filter((id): id is number => id !== null);
        setMaterialItemIds((prev) => [...prev, ...newIds]);

        if (successCount > 0) {
            setNotification({ message: `Upload thành công ${successCount}/${selectedFiles.length} file!`, type: "success" });
        }
        if (successCount < selectedFiles.length) {
            setNotification({ message: `Có ${selectedFiles.length - successCount} file upload thất bại.`, type: "error" });
        }
        if(e.target) e.target.value = '';
    };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialItemIds.length || !selectedCourseId || !selectedLecturerId || !name|| !price) {
      setNotification({ message: "Vui lòng nhập đầy đủ thông tin!", type: "error" });
      return;
    }

    const numericPrice = Number(price);
    if (numericPrice < 3000 || numericPrice > 15000) {
      setNotification({ message: "Giá coin phải từ 3000 đến 15000!", type: "error" });
      return;
    }

    const validIds = files.reduce((acc, file, index) => {
        const fileKey = `${file.name}-${file.lastModified}`;
        if (uploadProgress[fileKey] === 'success') {
            const idIndex = files.slice(0, index).filter(f => uploadProgress[`${f.name}-${f.lastModified}`] === 'success').length;
            acc.push(materialItemIds[idIndex]);
        }
        return acc;
    }, [] as number[]);


    if (validIds.length === 0) {
        setNotification({ message: "Không có file hợp lệ nào để tạo tài liệu!", type: "error" });
        return;
    }


   try {
      const res = await createMaterialAPI(
        name,
        description,
        Number(selectedCourseId),
        numericPrice,       
        Number(selectedLecturerId), 
        validIds
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
          const fileToDelete = files[fileToDeleteIndex];
          const fileKeyToDelete = `${fileToDelete.name}-${fileToDelete.lastModified}`;
    
          if (uploadProgress[fileKeyToDelete] === 'success') {
            const idIndexToDelete = files
              .slice(0, fileToDeleteIndex)
              .filter(f => uploadProgress[`${f.name}-${f.lastModified}`] === 'success').length;
    
            const newIds = [...materialItemIds];
            newIds.splice(idIndexToDelete, 1);
            setMaterialItemIds(newIds);
          }
    
          const newFiles = files.filter((_, i) => i !== fileToDeleteIndex);
          setFiles(newFiles);
    
          const newProgress = { ...uploadProgress };
          delete newProgress[fileKeyToDelete];
          setUploadProgress(newProgress);
    
          setNotification({ message: "Xóa file thành công", type: "success" });
          setFileToDeleteIndex(null);
        }
    };

 
  const isFormValid = name && files.length > 0 && selectedCourseId && selectedLecturerId && price;

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



        {/* Price Input */}
        <label className="material-create-label block mb-1 font-medium">
          Giá (Coin) <span className="textt-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Giá tài liệu (ví dụ: 15000)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="material-create-input border rounded px-3 py-2 w-full"
          min="3000"
          max="15000"
        />
        <div className="note-text">
          <ul>
            <li>
           Giá coin phải từ 3000 đến 15000.
            </li>
            <li>
             Bạn sẽ nhận được {Math.round(Number(price) * 0.8)} coin sau khi tài liệu được mua.
            </li>
          </ul>
        </div>

          {/* File Select */}

        <label className="material-create-label block mb-1 font-medium">
          File <span className="text-red-500">*</span>
        </label>

        <div className="material-create-file-container border border-dashed p-4 rounded relative cursor-pointer">
          <div className="upload-icon mb-2 text-center">
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
              className="lucide lucide-upload mx-auto"
            >
              <path d="M12 3v12" />
              <path d="m17 8-5-5-5 5" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            </svg>
          </div>

          <div className="upload-text text-center mb-2">
            {files.length > 0 ? (
              <p>
                <strong>{files.length} file đã chọn</strong>
              </p>
            ) : (
              <>
                <p>
                  <strong>Chọn tệp</strong> hoặc kéo thả vào đây
                </p>
                <p className="upload-subtext text-sm text-gray-500">
                  Hỗ trợ PDF, DOC, DOCX, PPT, PPTX tối đa 500MB
                </p>
              </>
            )}
          </div>
           <input
            type="file"
            multiple
            id="fileInput"
            onChange={handleFileChange}
            className="material-create-file-input"
          />

            {files.length > 0 && (
                <div className="preview-list flex gap-3 mt-4 flex-wrap">
                  {files.map((f, i) => {
                    const fileKey = `${f.name}-${f.lastModified}`;
                    const status = uploadProgress[fileKey];

                    return (
                        <div key={fileKey} className="preview-item">
                            <p className="file-name">{f.name}</p>
                            <div className="file-status">
                                {status === 'uploading' && <SpinnerIcon />}
                                {status === 'error' && <ErrorIcon />}
                                {status !== 'uploading' && (
                                    <button
                                        type="button"
                                        className="delete-file-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteFile(i);
                                        }}
                                    >
                                        <TrashIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                  })}
                </div>
            )}
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

