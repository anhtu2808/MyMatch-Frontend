import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import "./CreateMaterial.css";
import MaterialCreatePage from "../components/MaterialCreate/MaterialCreate";

const CreateMaterial: React.FC = () => {
  return (
    <div className="material-create-page-container">
      <Sidebar />
      <Header
        title="Tải lên tài liệu"
        script="Chia sẻ tài liệu học tập với cộng đồng"
      />
      <div className="material-create-content">
        <MaterialCreatePage />
      </div>
    </div>
  );
};

export default CreateMaterial;
