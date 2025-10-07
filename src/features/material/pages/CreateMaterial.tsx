import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import "./CreateMaterial.css";
import MaterialCreatePage from "../components/MaterialCreate/MaterialCreate";
import { useResponsive } from "../../../useResponsive";

const CreateMaterial: React.FC = () => {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="material-create-page-container">
      {!isMobile && <Sidebar />}
      <Header
        title="Tải lên tài liệu"
        script="Chia sẻ tài liệu học tập với cộng đồng"
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

      <div className="material-create-content">
        <MaterialCreatePage />
      </div>
    </div>
  );
};

export default CreateMaterial;
