import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectCoinsBalance, selectCurrentUser } from '../store/slices/userSlice';
import './Sidebar.css';

const Sidebar = () => {
//   const coinsBalance = useSelector(selectCoinsBalance);
//   const currentUser = useSelector(selectCurrentUser);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navItems = [
    {
      id: 'home',
      name: 'Bảng điều khiển',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'swap',
      name: 'Trao đổi lớp',
      path: '/swap_class',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    },
    {
      id: 'messages',
      name: 'Tin nhắn',
      path: '/messages',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      )
    },
    // others ...
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="sidebar">
        <div className="logoSection">
          <img
            src="/mymatch_logo.jpg"
            alt="MyMatch Logo"
            className="logoImg"
          />
        </div>

        <nav className="nav">
          <ul className="navList">
            {navItems.map((item) => (
              <li key={item.id} className="navItem">
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        `navLink ${isActive ? 'navLinkActive' : 'navLinkHover'}`
                    }
                    >
                  <div className="navIcon">{item.icon}</div>
                  <div className="tooltip">
                    {item.name}
                    <div className="tooltipArrow"></div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="settingsSection">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${isActive ? 'navLinkActive' : ''} ${!isActive ? 'navLinkHover' : ''}`
            }
          >
            <div className="navIcon">
              
            </div>
            <div className="tooltip">
              Cài đặt
              <div className="tooltipArrow"></div>
            </div>
          </NavLink>
        </div> */}

        <div className="userProfileSection">
          <div className="userProfile" onClick={() => handleDropdownToggle()}>
            <div className="userAvatar">
              {/* {(currentUser?.name || 'Alex Johnson').charAt(0).toUpperCase()} */}
            </div>
            <div className="tooltip">
              {/* <div className="font-medium">{currentUser?.name || 'Alex Johnson'}</div>
              <div className="balanceText">¥{(typeof coinsBalance === 'number' ? coinsBalance : 0).toLocaleString()}</div> */}
              <div className="tooltipArrow"></div>
            </div>
          </div>

          {/* Conditional rendering for the dropdown menu */}
          {isDropdownOpen && (
            <div className="dropdownMenu">
              <NavLink to="/profile" className="dropdownItem" onClick={() => setIsDropdownOpen(false)}>
                Hồ sơ
              </NavLink>
              <NavLink to="/login" className="dropdownItem" onClick={() => setIsDropdownOpen(false)}>
                Đăng nhập
              </NavLink>
              <button className="dropdownItem" onClick={() => {
                // Logout logic here
                // Set dropdown state to false after logging out
                setIsDropdownOpen(false);
              }}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Provide space for the sidebar */}
      <div style={{ width: '4rem' }} aria-hidden="true" />
    </>
  );
};

export default Sidebar;
