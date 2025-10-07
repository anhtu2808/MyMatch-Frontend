import React, { useState } from 'react';
import './AboutUs.css';
import Header from '../../components/header/Header';
import { useResponsive } from '../../useResponsive';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  { name: 'Trần Phú Khang', role: 'Backend Developer', avatar: "/khang.png" },
  { name: 'Nguyễn Sĩ Vạn Hào', role: 'Frontend Developer', avatar: '/hao.png' },
  { name: 'Đặng	Mai Anh	Tú', role: 'FullStack Developer', avatar: '/tu.png' },
  { name: 'Trịnh Thị Thùy Nhân', role: 'FullStack Developer', avatar: '/nhan.png' },
  { name: 'Ngô Nguyễn Huyền Trang', role: 'Marketing', avatar: '/trang.png' },
  { name: 'Vương Trần Quang Thắng', role: 'Marketing', avatar: '/thang.png' },
];

const coreValues = [
  {
    icon: '🎯',
    title: 'Minh bạch',
    description: 'Cung cấp thông tin rõ ràng và đáng tin cậy cho mọi quyết định của bạn.'
  },
  {
    icon: '🤝',
    title: 'Kết nối',
    description: 'Tạo ra những kết nối ý nghĩa giữa sinh viên và giảng viên.'
  },
  {
    icon: '💡',
    title: 'Đổi mới',
    description: 'Luôn tìm kiếm và áp dụng công nghệ mới để cải tiến sản phẩm.'
  }
];

const stats = [
  { number: '2K+', label: 'Sinh viên' },
  { number: '50+', label: 'Giảng viên' },
  { number: '1+', label: 'Trường học' },
  { number: '85%', label: 'Hài lòng' }
];

const AboutUsPage = () => {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      {!isMobile && <Sidebar />}
      <Header 
        title="MyMatch" 
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

      <div className="about-us-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="logo-wrapper">
              <img src="/mymatch_logo.jpg" alt="MyMatch Logo" className="hero-logo" />
            </div>
            <h1 className="hero-title">Sứ mệnh của chúng tôi</h1>
            <p className="hero-description">
              Nâng tầm đối sánh trực tuyến giúp sinh viên dễ dàng tìm kiếm và kết nối, 
              nhằm lựa chọn được môi trường học tập phù hợp nhất cho sự phát triển của bản thân.
            </p>
            <div className="hero-decoration"></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section-about">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card-about">
                <div className="stat-number-about">{stat.number}</div>
                <div className="stat-label-about">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section-about">
          <div className="section-header-about">
            <h2 className="section-title-about">Hành trình của MyMatch</h2>
          </div>
          <div className="story-content">
            <p>
              MyMatch ra đời từ mong muốn tạo ra một nền tảng giúp sinh viên có thể đưa ra 
              những quyết định sáng suốt về hành trình học tập của mình. Chúng tôi hiểu rằng 
              việc chọn đúng giảng viên và môi trường học tập có thể tạo nên sự khác biệt lớn 
              trong sự nghiệp của mỗi người.
            </p>
            <p>
              Với sự kết hợp giữa công nghệ hiện đại và sự thấu hiểu sâu sắc về nhu cầu của 
              sinh viên, chúng tôi không ngừng cải tiến để mang đến trải nghiệm tốt nhất.
            </p>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="values-section">
          <div className="section-header-about">
            <h2 className="section-title-about">Giá trị cốt lõi</h2>
          </div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header-about">
            <h2 className="section-title-about">Gặp gỡ đội ngũ của chúng tôi</h2>
          </div>
          <p className="team-intro">
            Chúng tôi là một đội ngũ gồm những người đam mê công nghệ và giáo dục, 
            cùng nhau xây dựng MyMatch với mong muốn tạo ra một sản phẩm có giá trị cho cộng đồng.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar-wrapper">
                  <div 
                    className="team-avatar" 
                    style={{ backgroundImage: `url(${member.avatar})` }}
                  />   
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Bắt đầu hành trình của bạn</h2>
            <p className="cta-description">
              Khám phá và kết nối với những giảng viên phù hợp nhất cho bạn ngay hôm nay.
            </p>
            <button className="cta-button" onClick={() => navigate("/")}>Khám phá ngay</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;