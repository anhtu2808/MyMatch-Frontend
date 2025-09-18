import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import "./MaterialPage.css";
import MaterialFilter from "../components/MaterialFilter";
import Pagination from "../../review/components/Pagination/Pagination";
import MaterialList from "../components/MaterialList";
import { getMaterialsAPI } from "../apis/MaterialPageAPIs";

interface Material {
  id: number;
  name: string;
  description: string;
  price: number;
  owner: {
    id: number;
    username: string;
    avatarUrl: string;
  };
  lecturer: {
    id: number;
    name: string;
    code: string;
  };
  totalDownloads: number;
  totalPurchases: number;
  createAt: string;
  updateAt: string;
  isPurchased: boolean;
}

const MaterialPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  // const fetchMaterials = async () => {
  //   try {
  //     const res = await getMaterialsAPI({
  //       page,
  //       size: 5,
  //       ...filters,
  //     });

  //     // Giả sử API trả về dạng { result: { data: [], totalPages: n } }
  //     setMaterials(res.result?.data || []);
  //     setTotalPages(res.result?.totalPages || 1);
  //   } catch (error) {
  //     console.error("Lỗi fetch materials:", error);
  //   }
  // };

  const fetchMaterials = async () => {
    // fake dữ liệu
    const fakeRes = {
      result: {
        totalPages: 2,
        data: [
          {
            id: 1,
            name: "Giải tích 1",
            description: "Tài liệu giải tích cơ bản",
            price: 50000,
            owner: {
              id: 101,
              username: "nguyenvana",
              avatarUrl: "/default-avatar.png",
            },
            lecturer: { id: 201, name: "Thầy Nguyễn Văn B", code: "GV001" },
            totalDownloads: 120,
            totalPurchases: 45,
            createAt: "2025-09-10T08:30:00.000Z",
            updateAt: "2025-09-15T14:20:00.000Z",
            isPurchased: true,
          },
          {
            id: 2,
            name: "Cấu trúc dữ liệu",
            description: "Slide + bài tập ôn tập",
            price: 75000,
            owner: {
              id: 102,
              username: "tranthib",
              avatarUrl: "/default-avatar.png",
            },
            lecturer: { id: 202, name: "Cô Trần Thị C", code: "GV002" },
            totalDownloads: 90,
            totalPurchases: 30,
            createAt: "2025-09-05T10:00:00.000Z",
            updateAt: "2025-09-12T09:15:00.000Z",
            isPurchased: false,
          },
        ],
      },
    };

    setMaterials(fakeRes.result.data);
    setTotalPages(fakeRes.result.totalPages);
  };

  useEffect(() => {
    fetchMaterials();
  }, [filters, page]);

  return (
    <div className="material-page-container">
      <Sidebar />
      <Header
        title="Tài liệu học tập"
        script="Tài nguyên học tập và tài liệu môn học"
      />
      <div className="material-page">
        <MaterialFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearch={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />
        <div className="material-list-container">
          <MaterialList materials={materials} />
        </div>
        <div className="material-pageination">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
