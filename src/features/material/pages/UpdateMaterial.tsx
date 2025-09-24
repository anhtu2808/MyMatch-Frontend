import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import MaterialUpdatePage from "../components/MaterialUpdate/MaterialUpdate";
import "./UpdateMaterial.css";

const UpdateMaterial: React.FC = () => {
  return (
    <div className="material-update-page-container">
      <Sidebar />
      <Header
        title="Cập nhật tài liệu"
        script="Cập nhật tài liệu đã đăng tải"
      />
      <div className="material-update-content">
        <MaterialUpdatePage />
      </div>
    </div>
  );
};

export default UpdateMaterial;
