import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useResponsive } from '../../useResponsive';
import './LegalPages.css';

const PrivacyPolicy = () => {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="legal-page">
      {!isMobile && <Sidebar />}
      <Header 
        title="Chính sách Bảo mật" 
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
              Thu thập Thông tin
            </h2>
            <div className="legal-section-content">
              <p>
                MyMatch thu thập nhiều loại thông tin khác nhau để cung cấp và cải thiện Dịch vụ của chúng tôi. Chúng tôi thu thập thông tin theo các cách sau:
              </p>
              
              <h3 className="subsection-title">1.1. Thông tin bạn cung cấp trực tiếp</h3>
              <ul className="legal-list">
                <li><strong>Thông tin tài khoản:</strong> Họ tên, địa chỉ email, mã số sinh viên, mật khẩu khi bạn đăng ký tài khoản</li>
                <li><strong>Thông tin hồ sơ:</strong> Ảnh đại diện, tiểu sử, lĩnh vực quan tâm, chuyên ngành học</li>
                <li><strong>Thông tin liên hệ:</strong> Số điện thoại, địa chỉ liên lạc khi bạn cập nhật hồ sơ</li>
                <li><strong>Nội dung do người dùng tạo:</strong> Bài viết, bình luận, đánh giá, tin nhắn bạn gửi qua nền tảng</li>
                <li><strong>Thông tin thanh toán:</strong> Thông tin thẻ tín dụng/ghi nợ khi sử dụng dịch vụ trả phí (được mã hóa an toàn)</li>
              </ul>

              <h3 className="subsection-title">1.2. Thông tin tự động thu thập</h3>
              <ul className="legal-list">
                <li><strong>Thông tin thiết bị:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành, nhận dạng thiết bị</li>
                <li><strong>Dữ liệu sử dụng:</strong> Thời gian truy cập, trang web đã xem, thời gian dành cho mỗi trang</li>
                <li><strong>Cookies:</strong> Thông tin được lưu trữ thông qua cookies và công nghệ theo dõi tương tự</li>
                <li><strong>Dữ liệu vị trí:</strong> Vị trí địa lý gần đúng dựa trên địa chỉ IP (nếu được cho phép)</li>
              </ul>

              <div className="info-box">
                <div className="info-box-icon">💡</div>
                <div className="info-box-content">
                  <strong>Lưu ý:</strong> Bạn có thể kiểm soát việc thu thập một số thông tin này thông qua cài đặt trình duyệt hoặc thiết bị của mình.
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">2</span>
              Sử dụng Thông tin
            </h2>
            <div className="legal-section-content">
              <p>Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:</p>
              
              <div className="purpose-grid">
                <div className="purpose-card">
                  <div className="purpose-icon">🎯</div>
                  <h4>Cung cấp Dịch vụ</h4>
                  <p>Vận hành, duy trì và cải thiện nền tảng MyMatch</p>
                </div>
                <div className="purpose-card">
                  <div className="purpose-icon">🔍</div>
                  <h4>Cá nhân hóa</h4>
                  <p>Gợi ý giảng viên, khóa học phù hợp với nhu cầu của bạn</p>
                </div>
                <div className="purpose-card">
                  <div className="purpose-icon">💬</div>
                  <h4>Giao tiếp</h4>
                  <p>Gửi thông báo, cập nhật và phản hồi yêu cầu hỗ trợ</p>
                </div>
                <div className="purpose-card">
                  <div className="purpose-icon">📊</div>
                  <h4>Phân tích</h4>
                  <p>Nghiên cứu xu hướng sử dụng và cải thiện trải nghiệm người dùng</p>
                </div>
                <div className="purpose-card">
                  <div className="purpose-icon">🛡️</div>
                  <h4>Bảo mật</h4>
                  <p>Phát hiện, ngăn chặn gian lận và bảo vệ người dùng</p>
                </div>
                <div className="purpose-card">
                  <div className="purpose-icon">⚖️</div>
                  <h4>Tuân thủ</h4>
                  <p>Đáp ứng nghĩa vụ pháp lý và quy định hiện hành</p>
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">3</span>
              Chia sẻ Thông tin
            </h2>
            <div className="legal-section-content">
              <p>
                MyMatch cam kết không bán thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
              </p>
              
              <h3 className="subsection-title">3.1. Với sự đồng ý của bạn</h3>
              <p>
                Chúng tôi sẽ chia sẻ thông tin cá nhân khi có sự đồng ý rõ ràng từ bạn cho mục đích cụ thể.
              </p>

              <h3 className="subsection-title">3.2. Với nhà cung cấp dịch vụ</h3>
              <p>
                Chúng tôi có thể chia sẻ thông tin với các đối tác đáng tin cậy để thực hiện các chức năng thay mặt chúng tôi như:
              </p>
              <ul className="legal-list">
                <li>Xử lý thanh toán</li>
                <li>Lưu trữ dữ liệu và hosting</li>
                <li>Dịch vụ phân tích và tiếp thị</li>
                <li>Hỗ trợ khách hàng</li>
              </ul>

              <h3 className="subsection-title">3.3. Vì lý do pháp lý</h3>
              <p>
                Chúng tôi có thể tiết lộ thông tin nếu pháp luật yêu cầu hoặc để:
              </p>
              <ul className="legal-list">
                <li>Tuân thủ quy trình pháp lý</li>
                <li>Thực thi các điều khoản dịch vụ của chúng tôi</li>
                <li>Bảo vệ quyền lợi, tài sản hoặc an toàn của MyMatch và người dùng</li>
                <li>Phòng chống hoặc điều tra các hành vi gian lận hoặc bất hợp pháp</li>
              </ul>

              <div className="warning-box">
                <div className="warning-box-icon">🔐</div>
                <div className="warning-box-content">
                  <strong>Cam kết:</strong> Tất cả các đối tác của chúng tôi đều phải tuân thủ các tiêu chuẩn bảo mật nghiêm ngặt và chỉ được sử dụng thông tin cho mục đích đã thỏa thuận.
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">4</span>
              Bảo mật Thông tin
            </h2>
            <div className="legal-section-content">
              <p>
                Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát, lạm dụng hoặc tiết lộ.
              </p>
              
              <h3 className="subsection-title">Các biện pháp bảo mật bao gồm:</h3>
              <ul className="legal-list">
                <li><strong>Mã hóa:</strong> Sử dụng SSL/TLS để mã hóa dữ liệu truyền tải</li>
                {/* <li><strong>Xác thực:</strong> Hệ thống xác thực đa yếu tố (2FA) cho tài khoản</li> */}
                <li><strong>Kiểm soát truy cập:</strong> Giới hạn quyền truy cập vào dữ liệu cá nhân</li>
                <li><strong>Giám sát:</strong> Theo dõi liên tục các mối đe dọa bảo mật</li>
                <li><strong>Sao lưu:</strong> Sao lưu dữ liệu định kỳ để phòng tránh mất mát</li>
                <li><strong>Đào tạo:</strong> Đào tạo nhân viên về thực hành bảo mật tốt nhất</li>
              </ul>

              <p>
                Tuy nhiên, không có phương pháp truyền tải qua Internet hoặc lưu trữ điện tử nào là an toàn 100%. Chúng tôi khuyến khích bạn sử dụng mật khẩu mạnh và không chia sẻ thông tin đăng nhập của mình với bất kỳ ai.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">5</span>
              Quyền của Bạn
            </h2>
            <div className="legal-section-content">
              <p>
                Bạn có các quyền sau đối với thông tin cá nhân của mình:
              </p>
              
              <div className="rights-grid">
                <div className="rights-card">
                  <div className="rights-number">1</div>
                  <h4>Quyền truy cập</h4>
                  <p>Yêu cầu một bản sao thông tin cá nhân chúng tôi lưu giữ về bạn</p>
                </div>
                <div className="rights-card">
                  <div className="rights-number">2</div>
                  <h4>Quyền sửa đổi</h4>
                  <p>Cập nhật hoặc sửa đổi thông tin cá nhân không chính xác</p>
                </div>
                <div className="rights-card">
                  <div className="rights-number">3</div>
                  <h4>Quyền xóa</h4>
                  <p>Yêu cầu xóa thông tin cá nhân của bạn trong các trường hợp nhất định</p>
                </div>
                <div className="rights-card">
                  <div className="rights-number">4</div>
                  <h4>Quyền hạn chế</h4>
                  <p>Yêu cầu hạn chế xử lý thông tin cá nhân của bạn</p>
                </div>
                <div className="rights-card">
                  <div className="rights-number">5</div>
                  <h4>Quyền phản đối</h4>
                  <p>Phản đối việc xử lý thông tin cho mục đích tiếp thị</p>
                </div>
                <div className="rights-card">
                  <div className="rights-number">6</div>
                  <h4>Quyền di chuyển</h4>
                  <p>Nhận thông tin cá nhân ở định dạng có thể đọc được bằng máy</p>
                </div>
              </div>

              <p>
                Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email hoặc mục "Liên hệ" bên dưới. Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 30 ngày.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">6</span>
              Lưu trữ Dữ liệu
            </h2>
            <div className="legal-section-content">
              <p>
                Chúng tôi chỉ lưu giữ thông tin cá nhân của bạn trong thời gian cần thiết để đáp ứng các mục đích đã nêu trong Chính sách Bảo mật này, trừ khi pháp luật yêu cầu hoặc cho phép thời gian lưu giữ lâu hơn.
              </p>
              
              <h3 className="subsection-title">Thời gian lưu trữ:</h3>
              <ul className="legal-list">
                <li><strong>Thông tin tài khoản:</strong> Được lưu giữ cho đến khi bạn yêu cầu xóa tài khoản</li>
                <li><strong>Dữ liệu giao dịch:</strong> Lưu trữ tối thiểu 5 năm theo quy định pháp luật</li>
                <li><strong>Nhật ký hệ thống:</strong> Thường được lưu giữ từ 6-12 tháng</li>
                <li><strong>Dữ liệu phân tích:</strong> Có thể lưu trữ ở dạng ẩn danh không xác định được danh tính</li>
              </ul>

              <p>
                Khi xóa tài khoản, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin cá nhân của bạn, trừ khi chúng tôi cần lưu giữ để tuân thủ nghĩa vụ pháp lý.
              </p>
            </div>
          </div>

          {/* <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">7</span>
              Cookies và Công nghệ Theo dõi
            </h2>
            <div className="legal-section-content">
              <p>
                MyMatch sử dụng cookies và các công nghệ theo dõi tương tự để cải thiện trải nghiệm người dùng, phân tích lưu lượng truy cập và cá nhân hóa nội dung.
              </p>

              <h3 className="subsection-title">Loại cookies chúng tôi sử dụng:</h3>
              <div className="cookies-table">
                <div className="cookies-row">
                  <div className="cookies-type">🍪 Cookies cần thiết</div>
                  <div className="cookies-desc">Bắt buộc cho hoạt động cơ bản của website (đăng nhập, bảo mật)</div>
                </div>
                <div className="cookies-row">
                  <div className="cookies-type">📊 Cookies phân tích</div>
                  <div className="cookies-desc">Giúp chúng tôi hiểu cách người dùng tương tác với website</div>
                </div>
                <div className="cookies-row">
                  <div className="cookies-type">⚙️ Cookies chức năng</div>
                  <div className="cookies-desc">Ghi nhớ tùy chọn và cài đặt của bạn</div>
                </div>
                <div className="cookies-row">
                  <div className="cookies-type">🎯 Cookies tiếp thị</div>
                  <div className="cookies-desc">Hiển thị quảng cáo phù hợp với sở thích của bạn</div>
                </div>
              </div>

              <p>
                Bạn có thể quản lý cookies thông qua cài đặt trình duyệt của mình. Tuy nhiên, việc vô hiệu hóa cookies có thể ảnh hưởng đến một số chức năng của website.
              </p>
            </div>
          </div> */}

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">7</span>
              Quyền Riêng tư của Trẻ em
            </h2>
            <div className="legal-section-content">
              <p>
                Dịch vụ của chúng tôi không dành cho người dưới 16 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 16 tuổi. Nếu bạn là phụ huynh hoặc người giám hộ và biết rằng con bạn đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ để chúng tôi có thể thực hiện các hành động cần thiết.
              </p>
              <div className="info-box">
                <div className="info-box-icon">👨‍👩‍👧‍👦</div>
                <div className="info-box-content">
                  <strong>Lưu ý phụ huynh:</strong> Nếu phát hiện thông tin của trẻ em dưới 16 tuổi, chúng tôi sẽ xóa ngay lập tức.
                </div>
              </div>
            </div>
          </div>

          <div className="legal-section">
            <h2 className="legal-section-title">
              <span className="section-number">8</span>
              Thay đổi Chính sách
            </h2>
            <div className="legal-section-content">
              <p>
                Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian để phản ánh các thay đổi trong thực tiễn xử lý thông tin của chúng tôi. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi quan trọng nào bằng cách:
              </p>
              <ul className="legal-list">
                <li>Đăng Chính sách Bảo mật mới trên trang này</li>
                <li>Gửi email thông báo đến địa chỉ email đăng ký của bạn</li>
                <li>Hiển thị thông báo nổi bật trên nền tảng MyMatch</li>
              </ul>
              <p>
                Chúng tôi khuyến khích bạn xem lại Chính sách Bảo mật này định kỳ để cập nhật thông tin về cách chúng tôi bảo vệ dữ liệu của bạn.
              </p>
            </div>
          </div>
        </main>
      </div>
       <Footer />
    </div>
  );
};

export default PrivacyPolicy;