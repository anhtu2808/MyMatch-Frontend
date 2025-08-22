// src/components/Header.tsx
import React from "react";
import './Header.css';

type HeaderProps = {
  title: string;
  script: string;
};

const Header: React.FC<HeaderProps> = ({ title, script }) => {
  return (
    <div
      className="header"
    >
      <div className="title">{title}</div>
      <div className="script">{script}</div>
    </div>
  );
};

export default Header;
