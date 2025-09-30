import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { selectCoinsBalance, selectCurrentUser } from '../store/slices/userSlice';
import "./Sidebar.css";
import { logOut } from "../../features/login/services/authenticationService";
import { getToken } from "../../features/login/services/localStorageService";
import { getProfileAPI } from "../../features/profile/apis";
import { useUnreadMessages } from "../../features/message/components/UnreadMessagesContext";

interface UserInfo {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
  address: string;
  role: string;
  permissions: string[];
  student?: {
    id: number;
    studentCode: string;
    campus?: {
      id: number;
      name: string;
    };
    skill: string;
    goals: number;
    description: string;
    major: string | null;
  };
}

const Sidebar = () => {
  //   const coinsBalance = useSelector(selectCoinsBalance);
  //   const currentUser = useSelector(selectCurrentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  // Get unread messages state
  const { hasUnread } = useUnreadMessages();

  // Function to check if a nav item should be active
  const isNavItemActive = (path: string) => {
    if (path === "/teachers") {
      // For teachers path, also consider lecturer-detail, review pages, and add-teacher as active
      return (
        location.pathname === "/teachers" ||
        location.pathname.startsWith("/lecturer-detail") ||
        location.pathname.startsWith("/add-review") ||
        location.pathname === "/add-teacher" ||
        location.pathname.startsWith("/review")
      );
    } else if (path === "/material") {
      return (
        location.pathname === "/material" ||
        location.pathname.startsWith("/material/")
      );
    }
    return location.pathname === path;
  };

  const navigation = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return; // chưa login thì thôi, không gọi API
    const fetchInfo = async () => {
      try {
        const response = await getProfileAPI();
        setInfo(response.result);
      } catch (err) {
        console.error("Error fetch info", err);
      }
    };
    fetchInfo();
  }, []);

  const navItems = [
    {
      id: "home",
      name: "Bảng điều khiển",
      path: "/",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      id: "teachers",
      name: "Review Giảng viên",
      path: "/teachers",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443a55.381 55.381 0 0 1 5.25 2.882V15"
          />
        </svg>
      ),
    },
//     {
//       id: "swap",
//       name: "Trao đổi lớp",
//       path: "/swap_class",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: "finding",
//       name: "Tìm nhóm",
//       path: "/finding",
//       icon: (
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           width="24"
//           height="24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6 0 3.375 3.375 0 0 1 6 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
//           ></path>
//         </svg>
//       ),
//     },
//     {
//       id: "messages",
//       name: "Tin nhắn",
//       path: "/messages",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="lucide lucide-message-circle-more-icon lucide-message-circle-more"
//         >
//           <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
//           <path d="M8 12h.01" />
//           <path d="M12 12h.01" />
//           <path d="M16 12h.01" />
//         </svg>
//       ),
//       hasNotification: hasUnread,
//     },
    {
      id: "material",
      name: "Tài liệu học tập",
      path: "/material",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          width="24"
          height="24"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25H13.19l-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25H13.19Z"
          ></path>
        </svg>
      ),
    },
//     {
//       id: "product",
//       name: "Sản phẩm",
//       path: "/product",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
//         >
//           <circle cx="8" cy="21" r="1" />
//           <circle cx="19" cy="21" r="1" />
//           <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
//         </svg>
//       ),
//     },
//     {
//       id: "payment",
//       name: "Thanh toán",
//       path: "/payment",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
//         >
//           <circle cx="12" cy="12" r="10" />
//           <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
//           <path d="M12 18V6" />
//         </svg>
//       ),
//     },
    // {
    //   id: "swap",
    //   name: "Trao đổi lớp",
    //   path: "/swap_class",
    //   icon: (
    //     <svg
    //       className="w-6 h-6"
    //       fill="none"
    //       stroke="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={1.5}
    //         d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   id: "messages",
    //   name: "Tin nhắn",
    //   path: "/messages",
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more-icon lucide-message-circle-more">
    //       <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/>
    //     </svg>
    //   ),
    // },
    // {
    //   id: "payment",
    //   name: "Thanh toán",
    //   path: "/payment",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="32"
    //       height="32"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
    //     >
    //       <circle cx="12" cy="12" r="10" />
    //       <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    //       <path d="M12 18V6" />
    //     </svg>
    //   )
    // },
    // {
    //   id: 'product',
    //   name: 'Sản phẩm',
    //   path: '/product',
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
    //     <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    //     </svg>
    //   )
    // }
    // others ...
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logOut();
    setIsDropdownOpen(false);
    navigation("/login");
  };

  const token = getToken();
  return (
    <>
      <div className="sidebar">
        <div className="logoSection" onClick={() => navigation("/")}>
          <img src="/mymatch_logo.jpg" alt="MyMatch Logo" className="logoImg" />
        </div>

        <nav className="nav">
          <ul className="navList">
            {navItems.map((item) => (
              <li key={item.id} className="navItem">
                <NavLink
                  to={item.path}
                  className={() =>
                    `navLink ${
                      isNavItemActive(item.path)
                        ? "navLinkActive"
                        : "navLinkHover"
                    }`
                  }
                >
                  <div className="navIcon">
                    {item.icon}
                    {item.hasNotification && (
                      <span className="notification-badge"></span>
                    )}
                  </div>
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
            <div>
              <img className="userAvatar" src={info?.avatarUrl} />
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
              <NavLink
                to="/profile"
                className="dropdownItem"
                onClick={() => setIsDropdownOpen(false)}
              >
                Hồ sơ
              </NavLink>
              {!token ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `dropdownItem ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Đăng nhập
                </NavLink>
              ) : (
                <button className="dropdownItem" onClick={() => handleLogout()}>
                  Đăng xuất
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Provide space for the sidebar */}
      <div style={{ width: "4rem" }} aria-hidden="true" />
    </>
  );
};

export default Sidebar;
