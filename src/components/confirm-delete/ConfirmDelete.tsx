import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./ConfirmDelete.css";

interface ConfirmDeleteProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  content?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  open,
  onConfirm,
  onCancel,
  title = "Xác nhận xóa",
  content = "Bạn có chắc chắn muốn xóa mục này không?",
}) => {
  return (
    <Modal
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ className: "delete-confirm-btn" }}
      cancelButtonProps={{ className: "cancel-confirm-btn" }}
      className="confirm-delete-modal"
      centered
    >
      <div className="confirm-delete-content">
        <ExclamationCircleOutlined className="confirm-icon" />
        <div className="confirm-texts">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-desc">{content}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
