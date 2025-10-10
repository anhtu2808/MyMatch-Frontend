import { useState } from 'react'
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import MaterialUpdatePage from "../components/MaterialUpdate/MaterialUpdate";
import "./UpdateMaterial.css";
import { useResponsive } from '../../../useResponsive'


const UpdateMaterial: React.FC = () => {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="material-update-page-container">
      {!isMobile && <Sidebar />}
      <Header
        title="Cập nhật tài liệu"
        script="Cập nhật tài liệu đã đăng tải"
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

      <div className="material-update-content">
        <MaterialUpdatePage />
      </div>
    </div>
  );
};

export default UpdateMaterial;