import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import "./MaterialDetailPage.css";
import MaterialDetail from "../components/MaterialDetailPage/MaterialDetail";

const MaterialDetailPage: React.FC = () => {
  return (
    <div className="material-detail-page-container">
      <Sidebar />
      <Header
        title="Chi tiết tài liệu"
        script="Xem thông tin chi tiết tài liệu"
      />
      <div className="material-detail-content">
        <MaterialDetail />
      </div>
    </div>
  );
};

export default MaterialDetailPage;
