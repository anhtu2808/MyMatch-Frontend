import { useEffect, useState } from "react"
import "./Banking.css"
import { fetchQrCodeAPI } from "../apis"
import { useNavigate } from "react-router-dom"

export interface Payment {
  accountNumber: string
  accountName: string
  bankCode: string
  content: string
  qrUrl: string
}

const Banking: React.FC = () => {
  const [accountHolder, setAccountHolder] = useState("NGUYEN THI KIM CHI")
  const [accountNumber, setAccountNumber] = useState("fuoverflowbank")
  const [bank, setBank] = useState("MB BANK")
  const [transferContent, setTransferContent] = useState("NAP5536FUO")
  const [qrCode, setQrCode] = useState<Payment | null>(null)
  const navigation = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetchQrCodeAPI();
        setQrCode(response.result)
      } catch (err) {
        console.error("Error fetch Qr code", err)
      }
    }
    fetchQrCode()
  }, [])
  return (
    <div className="banking-container">
      <div className="banking-grid">
        {/* Left Panel - Account Information */}
        <div className="banking-card">
          <div className="banking-card-header">
            <div className="banking-card-title">
              Thông tin tài khoản
            </div>
          </div>
          <div className="banking-card-content">
            {/* Action Buttons */}
            <div className="banking-actions">
              {/* Coin Conversion */}
              <div className="banking-fuo">
                💰 1 Coin = 1.000 VND
                <div className="banking-btn-subtitle">Tỷ giá quy đổi có định</div>
              </div>

              {/* Membership Purchase */}
              <div className="banking-membership-card">
                <div className="banking-membership-content">
                  <div className="banking-membership-header">
                    <div className="banking-membership-icon" />
                    <span className="banking-membership-title">Mua gói Premium</span>
                  </div>
                  <div className="banking-membership-steps">
                    <div>Quy trình 2 bước:</div>
                    <div>📝 Bước 1: Nạp Coint (tại trang này)</div>
                    <div>📝 Bước 2: Thanh toán các gói Premium bằng Coin</div>
                  </div>
                  <button className="banking-membership-btn" onClick={() => navigation("/product")}> Mua</button>
                </div>
              </div>

              {/* Account Management */}
              <div className="banking-warning-card">
                <div className="banking-warning-content">
                  <div className="banking-warning-header">
                    <div className="banking-warning-icon" />
                    <span className="banking-warning-title">Lưu ý quan trọng</span>
                  </div>
                  <div className="banking-warning-list">
                    <div>⚠️ Vui lòng chuyển đúng nội dung để tránh thất thoát hợp khống</div>
                    <div>⚠️ Điền đúng số Coint</div>
                    <div>⚠️ Sau khi chuyển tiền, vui lòng chờ ít nhất 1 phút để hệ</div>
                    <div>thống xử lý</div>
                    <div>
                      ⚠️ Liên hệ hỗ trợ: 
                      <a href="https://www.facebook.com/mymatchh/" 
                      className="banking-support-contact"
                      target="_blank" 
                      rel="noopener noreferrer"
                      > MyMatch</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - QR Code */}
        <div className="banking-card">
          <div className="banking-qr-content">
            <div className="banking-qr-section">
              {/* QR Header */}
              <div>
                <div className="banking-qr-header">
                  <div className="banking-qr-icon" />
                  <h2 className="banking-qr-title">Quét mã QR để nạp tiền</h2>
                </div>
                <p className="banking-qr-subtitle">Sử dụng ứng dụng ngân hàng để quét mã QR và chuyển tiền tự động</p>
              </div>

              {/* QR Code */}
              <div className="banking-qr-container">
                <div className="banking-qr-wrapper">
                  <img
                    src={qrCode?.qrUrl}
                    alt="QR Code for transfer"
                    className="banking-qr-image"
                  />
                </div>
                <div className="banking-qr-badges">
                  <div  className="banking-badge-mb">
                    TPBank
                  </div>
                  <div className="banking-badge-napas">
                    napas 247
                  </div>
                  <div  className="banking-badge-vietqr">
                    VietQR
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="banking-account-info-card">
                <div className="banking-account-info-content">
                  <h3 className="banking-account-info-title">
                    <div className="banking-account-info-icon" />
                    Thông tin tài khoản
                  </h3>
                  <div className="banking-account-info-list">
                    <div className="banking-account-info-item">
                      <div className="banking-account-info-item-icon" />
                      <span className="banking-account-info-label">Chủ tài khoản:</span>
                      <span className="banking-account-info-value">{qrCode?.accountName}</span>
                    </div>
                    <div className="banking-account-info-item">
                      <div className="banking-account-info-item-icon" />
                      <span className="banking-account-info-label">Số tài khoản:</span>
                      <span className="banking-account-info-value">{qrCode?.accountNumber}</span>
                    </div>
                    <div className="banking-account-info-item">
                      <div className="banking-account-info-item-icon" />
                      <span className="banking-account-info-label">Ngân hàng:</span>
                      <span className="banking-account-info-value">{qrCode?.bankCode}</span>
                    </div>
                    <div className="banking-account-info-item">
                      <div className="banking-account-info-item-icon" />
                      <span className="banking-account-info-label">Nội dung:</span>
                      <span className="banking-account-info-value">{qrCode?.content}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banking;