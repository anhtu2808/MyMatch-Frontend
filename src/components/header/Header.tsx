// src/components/Header.tsx
import React from "react";
import './Header.css';
import Coin from "../../features/coin/pages/Coin";

type HeaderProps = {
  title: string;
  script: string;
};

const Header: React.FC<HeaderProps> = ({ title, script }) => {
  const token = localStorage.getItem("accessToken");
  return (
    <div className="header-container">
      <div
      className="header"
      >
        <div className="title">{title}</div>
        <div className="script">{script}</div>
      </div>
       {token && 
      <div className="coin-container">
        <Coin /> 
      </div>  }
    </div>
  );
};

export default Header;
