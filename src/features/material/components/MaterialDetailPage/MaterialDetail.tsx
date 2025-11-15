import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMaterialByIdAPI,
  deleteMaterialAPI,
  MaterialDetailResponse,
  purchaseMaterialAPI,
  downloadMaterialAPI,
} from "../../apis/MaterialPageAPIs";
import "./MaterialDetail.css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Notification from "../../../../components/notification/Notification";
import ConfirmDelete from "../../../../components/confirm-delete/ConfirmDelete";
import { fetchUserProfile } from "../../../../store/Slice";

const BackArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const MaterialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<MaterialDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.user);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
  const [showItemList, setShowItemList] = useState(false);

  const userId = user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      getMaterialByIdAPI(Number(id))
        .then((res) => setMaterial(res))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!material) return <p>Không tìm thấy tài liệu</p>;

  const handleBackClick = () => {
    navigate(-1);
  };

  const isMyUpload = userId !== undefined && material?.owner?.id === userId;

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr + "Z").toLocaleDateString() : "Không rõ";

  const handlePurchase = async () => {
  const price = material.price ?? 0;
  const wallet = user?.wallet ?? 0;

  if (wallet < price) {
    setShowConfirmPurchase(false);
    setNotification({ message: "Số dư coin không đủ, hãy nạp coin để mua tài liệu này.", type: "error" });
    setTimeout(() => navigate("/payment"), 900);
    return;
  }

  try {
    const response = await purchaseMaterialAPI(material.id);
    console.log("Purchase response:", response);
    dispatch(fetchUserProfile());
    setMaterial((prev) => (prev ? { ...prev, isPurchased: true } : prev));
    setNotification({ message: "Mua tài liệu thành công!", type: "success" });
  } catch (err) {
    console.error(err);
    setNotification({ message: "Mua tài liệu thất bại!", type: "error" });
  } finally {
    setShowConfirmPurchase(false);
  }
};

  return (
    <div className="material-detail">
      {/* LEFT */}
      <div className="material-detail-left">
        <button className="material-back-button" onClick={handleBackClick}>
          <BackArrowIcon />
          <span>Quay lại</span>
        </button>
        <div className="material-detail-image">
          <img
            src="https://i.pinimg.com/1200x/97/ab/8c/97ab8c08ba83d0781f894dce40b0f70d.jpg"
            alt="preview"
          />
        </div>

        <h2 className="material-detail-title">
          {material.course?.code} - {material.name}
        </h2>

        <div className="material-detail-meta space-y-1">
          <span>
            <strong>Môn học:</strong> {material.course?.name}
          </span>
          <span>
            <strong>Giảng viên:</strong> {material.lecturer?.name ?? "Chưa có"}
          </span>
          {/* <span>
            <strong>Kích thước:</strong> 3.2MB
          </span> */}
          <span>
            <strong>Ngày tải lên:</strong> {formatDate(material.createAt)}
          </span>
        </div>

        <div className="material-detail-description">
          <h4>Mô tả tài liệu</h4>
          <p>{material.description}</p>
        </div>

        <div className="material-detail-owner">
          <img
            src={
              material.owner?.avatarUrl ||
              "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
            }
            alt={material.owner?.username || "Ẩn danh"}
            className="material-detail-owner-avatar"
          />
          <span>
            Được tải lên bởi{" "}
            <strong>{material.owner?.username ?? "Ẩn danh"}</strong>
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="material-detail-right">
        <h2>Tài liệu học tập</h2>

        {isMyUpload ? (
          <div className="material-detail-owner-actions ">
            <button
              className="material-detail-btn-update"
              onClick={() => navigate(`/material/update/${material.id}`)}
            >
              Cập nhật
            </button>
            <button
              className="material-detail-btn-delete"
              onClick={() => setShowConfirmDelete(true)}
            >
              Xóa
            </button>
            <ConfirmDelete
              open={showConfirmDelete}
              onCancel={() => setShowConfirmDelete(false)}
              onConfirm={async () => {
                try {
                  await deleteMaterialAPI(material.id);
                  setNotification({ message: "Xóa tài liệu thành công!", type: "success" });
                  navigate("/material");
                } catch (err) {
                  console.error(err);
                  setNotification({ message: "Xóa tài liệu thất bại!", type: "error" });
                } finally {
                  setShowConfirmDelete(false);
                }
              }}
            />
          </div>
        ) : material.isPurchased ? (
          <>
          <button
            className="material-detail-btn-download"
            onClick={() => setShowItemList(!showItemList)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-download-icon lucide-download"
            >
              <path d="M12 15V3" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5" />
            </svg>{" "}
            Tải xuống
            {/* ({material.price} coins) */}
          </button>
          {showItemList && (
          <div className="material-item-list">
            {material.items?.map((item) => (
              <button
                key={item.id}
                className="material-item-btn"
                onClick={() => downloadMaterialAPI(item.id)}
              >
                {item.originalFileName} ({item.size} MB)
              </button>
            ))}
          </div>
        )}
          </>
        ) : (
          <>
          <button
              className="material-detail-btn-purchase"
              onClick={() => setShowConfirmPurchase(true)}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-credit-card-icon lucide-credit-card"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            Mua tài liệu
            {/* ({material.price} coins) */}
          </button>
          <ConfirmDelete
            open={showConfirmPurchase}
            title="Xác nhận mua"
            content="Bạn có chắc chắn muốn mua tài liệu này không?"
            okText="Mua"
            onCancel={() => setShowConfirmPurchase(false)}
            // onConfirm={async () => {
            //   try {
            //     await purchaseMaterialAPI(material.id);
            //     setMaterial(prev => prev ? { ...prev, isPurchased: true } : prev);
            //     setNotification({ message: "Mua tài liệu thành công!", type: "success" });
            //   } catch (err) {
            //     console.error(err);
            //     setNotification({ message: "Mua tài liệu thất bại!", type: "error" });
            //   } finally {
            //     setShowConfirmPurchase(false);
            //   }
            // }}
            onConfirm={handlePurchase}
          />
          </>
        )}

        {/* <button className="material-detail-btn-preview">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-eye-icon lucide-eye"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>{" "}
          Xem trước miễn phí
        </button> */}

        <div className="material-detail-stats">
          {/* <p>Định dạng: PDF</p> */}
          {/* <p>Lượt tải: {material.totalDownloads}</p> */}
          <p>Lượt mua: {material.totalPurchases}</p>
          <p>
            <span className="material-detail-purchased">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-badge-russian-ruble-icon lucide-badge-russian-ruble"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="M9 16h5" />
                <path d="M9 12h5a2 2 0 1 0 0-4h-3v9" />
              </svg>
              : {material.price} coins
            </span>
          </p>
        </div>
      </div>
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default MaterialDetail;
