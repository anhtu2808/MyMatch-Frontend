import { useEffect, useState, useCallback } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import "./MaterialPage.css";
import MaterialFilter from "../components/MaterialFilter/MaterialFilter";
import Pagination from "../../review/components/Pagination/Pagination";
import MaterialList from "../components/MaterialList/MaterialList";
import { useAppSelector } from "../../../store/hooks";
import {
  getMaterialsAPI,
  getCoursesAPI,
  getAllLecturerAPI,
} from "../apis/MaterialPageAPIs";
import { useResponsive } from '../../../useResponsive'

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
  course: {
    id: number;
    code: string;
    name: string;
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useResponsive(1024);
  const user = useAppSelector((state) => state.user);
  const userId = user?.id;

  const fetchMaterials = async () => {
    try {
      let courseId: number | undefined;
      let lecturerId: number | undefined;

      if (filters.course) {
        const courseRes = await getCoursesAPI({ code: filters.course });
        courseId = courseRes?.result?.data?.[0]?.id;
      }

      if (filters.lecturer) {
        const lecturerRes = await getAllLecturerAPI({ name: filters.lecturer });
        lecturerId = lecturerRes?.result?.data?.[0]?.id;
      }

      const res = await getMaterialsAPI({
        page,
        size: 5,
        name: filters.name,
        courseId,
        lecturerId,
        ownerId: filters.ownerOnly ? userId ?? undefined : undefined,
        isPurchased: filters.isPurchased, 
        sortBy: filters.sortBy, 
        sortDir: filters.sortDir,
      });

      const mapped = (res.data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        owner: {
          id: item.owner?.id,
          username: item.owner?.username,
          avatarUrl: item.owner?.avatarUrl,
        },
        lecturer: {
          id: item.lecturer?.id,
          name: item.lecturer?.name,
          code: item.lecturer?.code,
        },
        course: {
          id: item.course?.id,
          code: item.course?.code,
          name: item.course?.name,
        },
        totalDownloads: item.totalDownloads,
        totalPurchases: item.totalPurchases,
        createAt: item.createAt,
        updateAt: item.updateAt,
        isPurchased: item.isPurchased,
      }));

      setMaterials(mapped);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Lỗi fetch materials:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [filters, page]);

  const handleSearch = useCallback((newFilters: any) => {
      setFilters(newFilters);
      setPage(1);
    }, []);

  return (
    <div className="material-page-container">
      {!isMobile && <Sidebar />}
      <Header
        title="Tài liệu học tập"
        script="Tài nguyên học tập và tài liệu môn học"
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

      <div className="material-page">
        <MaterialFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearch={handleSearch}
        />
        <div className="material-list-container">
          <MaterialList
            materials={materials}
            isMyUploads={activeTab === "mine"}
          />
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