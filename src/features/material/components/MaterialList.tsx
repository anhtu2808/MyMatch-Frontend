import React from "react";
import "./MaterialList.css";

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
  totalDownloads: number;
  totalPurchases: number;
  createAt: string;
  updateAt: string;
  isPurchased: boolean;
}
interface Props {
  materials: Material[];
}

const MaterialList: React.FC<Props> = ({ materials }) => {
  if (materials.length === 0) {
    return <div className="material-empty">Không có tài liệu nào</div>;
  }

  return (
    <div className="material-list">
      <h2>Tất cả tài liệu</h2>
      {materials.map((m) => (
        <div key={m.id} className="material-card">
          <div className="material-info">
            <div className="material-title">
              {m.name} - {m.description}
            </div>
            <div className="material-meta">
              Giá: {m.price} • Chủ sở hữu: {m.owner.username} • Giảng viên:{" "}
              {m.lecturer?.name}
            </div>
            <div className="material-stats">
              Downloads: {m.totalDownloads} • Purchases: {m.totalPurchases}
            </div>
            <div className="material-dates">
              Tạo: {new Date(m.createAt).toLocaleDateString()} • Cập nhật:{" "}
              {new Date(m.updateAt).toLocaleDateString()}
            </div>
          </div>
          <div className="material-status">
            {m.isPurchased ? (
              <span className="material-purchased">Đã mua</span>
            ) : (
              <span className="material-not-purchased">Chưa mua</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaterialList;
