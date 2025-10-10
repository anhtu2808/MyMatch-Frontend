// src/components/Header.tsx
import React from "react";
import './Header.css';

type HeaderProps = {
  title: string;
  script?: string;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, script, onToggleSidebar, isMobile }) => {
  return (
    <div className="header-container">
      <div className="header">
        {isMobile && (
          <button className="hamburger-btn" onClick={onToggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
          </button>
        )}
        <div className="title">{title}</div>
        <div className="script">{script}</div>
      </div>
    </div>
  );
};

export default Header;
