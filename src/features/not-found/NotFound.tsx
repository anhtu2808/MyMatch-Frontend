import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './NotFound.css';

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="container-404">
      {/* Animated Background Elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Floating Stars */}
      <div className="stars-404">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="star-404" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}></div>
        ))}
      </div>

      <div className="content-404">
        {/* Illustration Container */}
        <div className="illustration-wrapper" style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}>
          <div className="sleeping-dev">
            {/* Fallback nếu chưa có ảnh */}
            <div className="dev-placeholder">
              <div className="dev-head"></div>
              <div className="dev-body"></div>
              <div className="zzz">
                <span>Z</span>
                <span>Z</span>
                <span>Z</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-content">
          <h1 className="title-404">
            <span className="digit">4</span>
            <span className="digit">0</span>
            <span className="digit">4</span>
          </h1>
          
          <h2 className="subtitle-404">Oh Noooo! Không tìm thấy trang</h2>
          
          <p className="description-404">
            Đi lạc đâu qua đây vậy bạn hiền ơi😑<br />
            Quay về trải nghiệm các tính năng hay ho và luôn ủng hộ chúng tôi nhé 🥰🥰
          </p>

          <div className="button-group">
            <Link to="/" className="button-404 button-primary">
              <span>Quay về</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L17 10L10 17M17 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}