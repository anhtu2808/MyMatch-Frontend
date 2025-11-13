export const statusTranslations = {
  PENDING: "Đang chờ xử lý",
  SENT: "Đã gửi",
  CANCELLED: "Đã hủy",
  COMPLETED: "Hoàn thành",
  EXPIRED: "Đã hết hạn",
  OPEN: "Đang mở",
  CLOSED: "Đang đóng",
  APPROVED: "Đã chấp nhận",
  REJECTED: "Đã từ chối ",
  SERVICE_PURCHASE: "Dịch vụ đã mua",
  TOP_UP: "Đã nạp",
};

export function translateStatus(status) {
  if (!status) return "Không xác định";
  const normalized = status.trim().toUpperCase();
  return statusTranslations[normalized] || status;
}
