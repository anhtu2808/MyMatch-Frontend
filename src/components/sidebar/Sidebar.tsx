
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectCoinsBalance, selectCurrentUser } from '../store/slices/userSlice';
import './Sidebar.css';
import { logOut } from '../../features/login/services/authenticationService';

const Sidebar = () => {
//   const coinsBalance = useSelector(selectCoinsBalance);
//   const currentUser = useSelector(selectCurrentUser);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const location = useLocation();

// Function to check if a nav item should be active
const isNavItemActive = (path: string) => {
  if (path === '/teachers') {
    // For teachers path, also consider lecturer-detail, review pages, and add-teacher as active
    return location.pathname === '/teachers' ||
           location.pathname === '/lecturer-detail' ||
           location.pathname.startsWith('/add-review') ||
           location.pathname === '/add-teacher';
  }
  return location.pathname === path;
};

const navigation = useNavigate();
const dropdownRef = useRef<HTMLDivElement>(null);

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
    },{
      id: 'teachers',
      name: 'Review Giảng viên',
      path: '/teachers',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443a55.381 55.381 0 0 1 5.25 2.882V15" />
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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOut();
    setIsDropdownOpen(false);
    navigation('/login');
  }

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
                    className={() =>
                        `navLink ${isNavItemActive(item.path) ? 'navLinkActive' : 'navLinkHover'}`
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

        <div className="userProfileSection" ref={dropdownRef}>
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
              <NavLink 
                to="/login" 
                className={({ isActive }) => `dropdownItem ${isActive ? "active" : ""}`} 
                onClick={() => setIsDropdownOpen(false)}
              >
                Đăng nhập
              </NavLink>

              <button className="dropdownItem" onClick={() => handleLogout()}>
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
