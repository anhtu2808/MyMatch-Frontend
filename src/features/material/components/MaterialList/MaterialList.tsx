import React from "react";
import "./MaterialList.css";
import { useState, useEffect } from "react";
import { deleteMaterialAPI } from "../../apis/MaterialPageAPIs";
import { useNavigate } from "react-router-dom";
import Notification from "../../../../components/notification/Notification";
import ConfirmDelete from "../../../../components/confirm-delete/ConfirmDelete";

export interface Material {
  id: number;
  name: string;
  description: string;
  price: number;
  owner: {
    id: number;
    username: string;
    avatarUrl: string;
  };
  lecturer: {
    id: number;
    name: string;
    code: string;
  };
  course?: {
    id: number;
    name: string;
    code: string;
  };
  totalDownloads: number;
  totalPurchases: number;
  createAt: string;
  updateAt: string;
  isPurchased: boolean;
}
interface Props {
  materials: Material[];
  isMyUploads?: boolean;
}

const MaterialList: React.FC<Props> = ({ materials, isMyUploads }) => {
  const [list, setList] = useState<Material[]>(materials);
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setList(materials);
  }, [materials]);

  const showDeleteModal = (m: Material) => {
    setMaterialToDelete(m);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!materialToDelete) return;
    try {
      await deleteMaterialAPI(materialToDelete.id);
      setList(list.filter((m) => m.id !== materialToDelete.id));
      setNotification({ message: "Xóa tài liệu thành công!", type: "success" });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Xóa thất bại!", type: "error" });
    } finally {
      setDeleteModalOpen(false);
      setMaterialToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setMaterialToDelete(null);
  };

  if (list.length === 0) {
    return <div className="material-empty">Không có tài liệu nào</div>;
  }

  const formatPrice = (p?: number) => {
    if (p == null) return "-";
    if (p === 0) return "Miễn phí";
    try {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "Coins",
      }).format(p);
    } catch (err) {
      return p.toString();
    }
  };

  const handleClick = (id: number) => {
    navigate(`/material/${id}`);
  };

  return (
    <div className="material-list">
      <h2>{isMyUploads ? "Tài liệu đã đăng tải" : "Tất cả tài liệu"}</h2>
      {list.map((m) => (
        <div
          key={m.id}
          className="material-card"
          onClick={() => handleClick(m.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="material-info">
            <div className="material-header">
              <div className="left">
                <span className="material-title">
                  {m.course?.code} - {m.name}
                </span>
                <span className="material-stats">({m.totalPurchases} lượt mua)</span>
              </div>
              {/* price will be aligned with status on the right */}
            </div>

            <div className="material-meta">
              Tải lên bởi: {m.owner.username} • Giảng viên: {m.lecturer?.name}
            </div>
            <div className="material-dates">
              Tạo: {new Date(m.createAt).toLocaleDateString()} • Cập nhật:{" "}
              {new Date(m.updateAt).toLocaleDateString()}
            </div>
          </div>

          {/* right area: price + purchase status */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="material-price">{formatPrice(m.price)}</span>
            {!isMyUploads && (
              <div className="material-status">
                {m.isPurchased ? (
                  <span className="material-purchased">
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
                  </span>
                ) : (
                  <span className="material-not-purchased">
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
                  </span>
                )}
              </div>
            )}
          </div>

          {isMyUploads && (
            <button
              className="material-delete"
              onClick={(e) => {
                e.stopPropagation();
                showDeleteModal(m);
              }}
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
                className="lucide lucide-x-icon lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      {deleteModalOpen && (
        <ConfirmDelete
          open={deleteModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

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

export default MaterialList;
