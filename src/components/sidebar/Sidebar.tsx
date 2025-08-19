import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectCoinsBalance, selectCurrentUser } from '../store/slices/userSlice';
import './Sidebar.css';

const Sidebar = () => {
//   const coinsBalance = useSelector(selectCoinsBalance);
//   const currentUser = useSelector(selectCurrentUser);

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
    // others ...
  ];

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

        <div className="settingsSection">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${isActive ? 'navLinkActive' : ''} ${!isActive ? 'navLinkHover' : ''}`
            }
          >
            <div className="navIcon">
              {/* Settings Icon SVG here */}
            </div>
            <div className="tooltip">
              Cài đặt
              <div className="tooltipArrow"></div>
            </div>
          </NavLink>
        </div>

        {/* <div className={styles.userProfileSection}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
              {(currentUser?.name || 'Alex Johnson').charAt(0).toUpperCase()}
            </div>
            <div className={styles.tooltip}>
              <div className="font-medium">{currentUser?.name || 'Alex Johnson'}</div>
              <div className={styles.balanceText}>¥{(typeof coinsBalance === 'number' ? coinsBalance : 0).toLocaleString()}</div>
              <div className={styles.tooltipArrow}></div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Provide space for the sidebar */}
      <div style={{ width: '4rem' }} aria-hidden="true" />
    </>
  );
};

export default Sidebar;
