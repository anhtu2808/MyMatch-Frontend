import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import TeacherPageComponents, {
  TeacherCardData,
} from "../components/TeacherCard/TeacherPageComponents";
import TeacherFilter from "../components/TeacherFilter/filter";
import Pagination from "../components/Pagination/Pagination";
import { getAllLecturerAPI } from "../apis/TeacherPageApis";
import "./TeachersPage.css";

function TeachersPage() {
  const [lecturers, setLecturers] = useState<TeacherCardData[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [bookmarkedTeachers, setBookmarkedTeachers] = useState<number[]>([]);

  const handleToggleBookmark = (teacherId: number) => {
    setBookmarkedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const mapLecturerToTeacher = (lecturer: any): TeacherCardData => ({
    id: lecturer.id, // thêm id từ API
    name: lecturer.fullName || lecturer.name,
    username: lecturer.code || lecturer.username,
    avatar: lecturer.avatarUrl || "/default-avatar.png",
    courses: lecturer.courses?.map((c: any) => c.name) || [],
    rating: lecturer.rating || 0,
    reviews: lecturer.reviewCount || 0,
    subjects: lecturer.subjectCount || 0,
  });

  const fetchLecturers = async () => {
    try {
      const res = await getAllLecturerAPI({
        page,
        size: 10,
        ...filters,
      });
      const mapped = res.result.data.map(mapLecturerToTeacher);
      setLecturers(mapped);
      setTotalPages(res.result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, [filters, page]);

  return (
    <div className="teachers-page-container">
      <Sidebar />
      <Header
        title="Review giảng viên"
        script="Chia sẻ review và tìm hiểu về giảng viên"
      />
      <div className="teachers-page">
        <TeacherFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearch={(newFilters) => setFilters(newFilters)}
        />

        <h1 className="h1">Danh sách giảng viên</h1>
        <div className="teachers-page-components">
          <TeacherPageComponents
            teachers={lecturers}
            searchQuery={searchQuery}
            showEmptyState={lecturers.length === 0}
            filters={filters}
            activeTab={activeTab}
            bookmarkedTeachers={bookmarkedTeachers}
            onToggleBookmark={handleToggleBookmark}
          />
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}

export default TeachersPage;
