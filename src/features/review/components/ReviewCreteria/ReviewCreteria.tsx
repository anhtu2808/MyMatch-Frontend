import React, { useEffect, useState } from "react";
import { Input, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getReviewCriteriaAPI,
  uploadEvidenceAPI,
} from "../../apis/TeacherPageApis";
import "./ReviewCreteria.css";

const PolyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="info-icon"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

interface Criterion {
  id: number;
  name: string;
  type: "mark" | "yes_no" | "comment";
  description?: string;
}

interface ReviewFormProps {
  onChange?: (data: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onChange }) => {
  const [criteriaList, setCriteriaList] = useState<Criterion[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [evidenceUrl, setEvidenceUrl] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    getReviewCriteriaAPI().then((res) => {
      setCriteriaList(res.result);
    });
  }, []);

  useEffect(() => {
    if (criteriaList.length === 0) {
      setIsFormValid(false);
      return;
    }
    const allAnswered = criteriaList.every((criterion) => {
      const answer = answers[criterion.id];
      if (answer === undefined || answer === null) {
        return false;
      }
      if (criterion.type === "comment" && String(answer).trim() === "") {
        return false;
      }
      return true;
    });

    setIsFormValid(allAnswered);
  }, [answers, criteriaList]);

  useEffect(() => {
    const formData = {
      answers,
      evidenceUrl, 
      isAnonymous,
    };
    onChange?.({ data: formData, isValid: isFormValid });
  }, [answers, evidenceUrl, isAnonymous, isFormValid, onChange]);

  const handleAnswerChange = (id: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      const url = info.file.response?.url || "";
      setEvidenceUrl(url);
    }
  };

  return (
    <div className="review-form">
      {/* --- Render tiêu chí từ API --- */}
      {criteriaList.map((c) => (
        <div key={c.id} className="criteria-item">
          <div className="criteria-header">
            <div className="criteria-title">
              <h3>{c.name}</h3>
              {c.description && (
                <p className="criteria-description">{c.description}</p>
              )}
            </div>
            {c.type === "mark" && (
              <span className="score-text">{answers[c.id] || 0}/5</span>
            )}
          </div>

          {c.type === "mark" && (
            <div className="mark-options">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`mark-btn ${answers[c.id] >= n ? "selected" : ""}`}
                  onClick={() => handleAnswerChange(c.id, n)}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {c.type === "yes_no" && (
            <div className="yesno-options">
              <button
                className={`yes-btn ${
                  answers[c.id] === "yes" ? "selected" : ""
                }`}
                onClick={() => handleAnswerChange(c.id, "yes")}
              >
                Yes
              </button>
              <button
                className={`no-btn ${answers[c.id] === "no" ? "selected" : ""}`}
                onClick={() => handleAnswerChange(c.id, "no")}
              >
                No
              </button>
            </div>
          )}

          {c.type === "comment" && (
            <Input.TextArea
              rows={3}
              placeholder={`Nhập nhận xét về ${c.name}...`}
              value={answers[c.id] || ""}
              onChange={(e) => handleAnswerChange(c.id, e.target.value)}
            />
          )}
        </div>
      ))}

      {/* --- FIELD CỐ ĐỊNH --- */}
      <div className="criteria-item evidence-box">
        <h3>Minh chứng bạn từng học với giảng viên này</h3>
        <Upload
          name="file"
          customRequest={async ({ file, onSuccess, onError }) => {
            try {
              const res = await uploadEvidenceAPI(file as File);
              setEvidenceUrl(res.result); // backend trả về link
              onSuccess?.(res, file);
            } catch (err) {
              console.error("Upload failed:", err);
              onError?.(err as any);
            }
          }}
          showUploadList={false}
        >
          <div className="upload-placeholder">
            {evidenceUrl ? (
              <p>Đã upload: {evidenceUrl}</p>
            ) : (
              <>
                <UploadOutlined style={{ fontSize: 24 }} />
                <p className="envidence">Chưa có ảnh minh chứng</p>
              </>
            )}
          </div>
        </Upload>

        <div className="note-text">
          <ul>
            <li>
            Để xác thực thông tin review là chính xác, vui lòng upload hình ảnh lớp học FAP thuộc giảng viên bạn review và Attendance report.
            </li>
            <li>
            Với những review upload bao gồm hình ảnh minh chứng, bạn sẽ được cộng <b>1000 coins</b> sau khi review được duyệt xác minh hình ảnh.
            </li>
          </ul>
        </div>
      </div>

      <div className="policyy-boxx">
        <div className="policyy-header">
          <PolyIcon />
          <h3>Chính sách đánh giá</h3>
        </div>
        <ul>
          <li>
            Review của bạn sẽ bị xoá nếu bạn sử dụng ngôn từ tục tĩu hoặc mang
            tính xúc phạm, công kích cá nhân.
          </li>
          <li>
            Phản ánh đúng trải nghiệm thực tế của bạn trong quá trình học.
          </li>
          <li>
            Review gửi đã gửi đi sẽ không thể chỉnh sửa, vui lòng điền đầy đủ
            thông tin và đọc lại kĩ trước khi nhấn Submit.
          </li>
          
        </ul>
      </div>

      <div className="criteriaa-item">
        <h3>Đăng review ẩn danh</h3>
        <br />
        <Switch
          checked={isAnonymous}
          onChange={(checked) => setIsAnonymous(checked)}
        />
        <span style={{ marginLeft: 8 }}>
          {isAnonymous
            ? "Tên của bạn sẽ không hiển thị công khai"
            : "Tên của bạn sẽ hiển thị công khai"}
        </span>
      </div>
    </div>
  );
};

export default ReviewForm;
