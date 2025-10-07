import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useResponsive } from '../../useResponsive';
import './LegalPages.css';

const TermsOfService = () => {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="legal-page">
      {!isMobile && <Sidebar />}
      <Header 
        title="Điều khoản Dịch vụ" 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        isMobile={isMobile}
      />
      
      {isMobile && (
        <>
          <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
            <Sidebar isMobile={true} />
          </div>
          {sidebarOpen && (
            <div className="overlay" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}

      <div className="legal-page-wrapper">
        <main className="legal-content">
          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">1</span>
              Chấp nhận Điều khoản
            </h2>
            <div className="legal-section-content">
              <p>
                Bằng cách truy cập và sử dụng nền tảng MyMatch ("Dịch vụ"), bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng Dịch vụ của chúng tôi.
              </p>
              <p>
                MyMatch là nền tảng kết nối sinh viên với giảng viên, cung cấp môi trường học tập trực tuyến và các công cụ hỗ trợ giáo dục. Việc sử dụng Dịch vụ của chúng tôi đồng nghĩa với việc bạn cam kết tuân thủ các quy định này.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">2</span>
              Thay đổi Điều khoản
            </h2>
            <div className="legal-section-content">
              <p>
                MyMatch có quyền sửa đổi, cập nhật hoặc thay thế các điều khoản này vào bất kỳ lúc nào mà không cần thông báo trước. Bạn có trách nhiệm xem lại các điều khoản này định kỳ để nắm bắt các thay đổi.
              </p>
              <p>
                Việc bạn tiếp tục sử dụng Dịch vụ sau khi có các thay đổi được công bố đồng nghĩa với việc bạn chấp nhận các điều khoản mới. Chúng tôi khuyến khích bạn kiểm tra trang này thường xuyên để cập nhật các thông tin mới nhất.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">3</span>
              Trách nhiệm của Người dùng
            </h2>
            <div className="legal-section-content">
              <p>Khi sử dụng MyMatch, bạn đồng ý:</p>
              <ul className="legal-list">
                <li>Không sử dụng Dịch vụ cho bất kỳ mục đích bất hợp pháp hoặc trái với quy định nào</li>
                <li>Tuân thủ tất cả các luật và quy định hiện hành tại Việt Nam</li>
                <li>Không can thiệp hoặc làm gián đoạn hoạt động của Dịch vụ</li>
                <li>Không tải lên hoặc truyền tải bất kỳ nội dung vi phạm bản quyền, phỉ báng, hoặc không phù hợp</li>
                <li>Không thu thập thông tin cá nhân của người dùng khác mà không có sự đồng ý</li>
                <li>Duy trì tính bảo mật của thông tin đăng nhập tài khoản của bạn</li>
                <li>Chịu trách nhiệm về mọi hoạt động diễn ra dưới tài khoản của bạn</li>
              </ul>
              <div className="warning-box">
                <div className="warning-box-icon">⚠️</div>
                <div className="warning-box-content">
                  <strong>Cảnh báo:</strong> Vi phạm các quy định này có thể dẫn đến việc đình chỉ hoặc chấm dứt tài khoản của bạn mà không cần thông báo trước.
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">4</span>
              Tài khoản và Đăng ký
            </h2>
            <div className="legal-section-content">
              <p>
                Để sử dụng một số tính năng của MyMatch, bạn cần tạo tài khoản. Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật trong quá trình đăng ký.
              </p>
              <p>Bạn có trách nhiệm:</p>
              <ul className="legal-list">
                <li>Duy trì tính bảo mật của mật khẩu và thông tin tài khoản</li>
                <li>Thông báo ngay cho chúng tôi nếu phát hiện bất kỳ vi phạm bảo mật nào</li>
                <li>Đảm bảo rằng bạn đăng xuất khỏi tài khoản sau mỗi phiên làm việc</li>
                <li>Không chia sẻ tài khoản của bạn với người khác</li>
              </ul>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">5</span>
              Quyền Sở hữu Trí tuệ
            </h2>
            <div className="legal-section-content">
              <p>
                Tất cả nội dung, tính năng và chức năng của MyMatch (bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh, video, và phần mềm) thuộc sở hữu của MyMatch hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật bản quyền quốc tế.
              </p>
              <p>
                Bạn không được phép sao chép, sửa đổi, phân phối, hiển thị công khai hoặc tạo ra các tác phẩm phái sinh từ bất kỳ phần nào của Dịch vụ mà không có sự cho phép bằng văn bản từ MyMatch.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">6</span>
              Giới hạn Trách nhiệm
            </h2>
            <div className="legal-section-content">
              <p>
                MyMatch và các bên liên quan sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, do hậu quả hoặc thiệt hại mang tính trừng phạt nào phát sinh từ:
              </p>
              <ul className="legal-list">
                <li>Việc sử dụng hoặc không thể sử dụng Dịch vụ</li>
                <li>Truy cập trái phép hoặc thay đổi dữ liệu của bạn</li>
                <li>Tuyên bố hoặc hành vi của bên thứ ba trên Dịch vụ</li>
                <li>Bất kỳ vấn đề nào khác liên quan đến Dịch vụ</li>
              </ul>
              <p>
                Dịch vụ được cung cấp trên cơ sở "nguyên trạng" và "sẵn có". MyMatch không đảm bảo rằng Dịch vụ sẽ không bị gián đoạn, không có lỗi, an toàn hoặc không có virus.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">7</span>
              Chấm dứt Dịch vụ
            </h2>
            <div className="legal-section-content">
              <p>
                Chúng tôi có quyền đình chỉ hoặc chấm dứt quyền truy cập của bạn vào Dịch vụ ngay lập tức, mà không cần thông báo trước hoặc chịu trách nhiệm, vì bất kỳ lý do nào, bao gồm nhưng không giới hạn ở việc vi phạm Điều khoản Dịch vụ này.
              </p>
              <p>
                Sau khi chấm dứt, quyền sử dụng Dịch vụ của bạn sẽ chấm dứt ngay lập tức. Tất cả các điều khoản mà về bản chất nên tồn tại sau khi chấm dứt sẽ vẫn có hiệu lực.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">8</span>
              Luật Áp dụng
            </h2>
            <div className="legal-section-content">
              <p>
                Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các Điều khoản này sẽ được giải quyết tại các tòa án có thẩm quyền tại Thành phố Hồ Chí Minh.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;