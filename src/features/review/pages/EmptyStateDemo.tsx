import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import TeacherFilter from "../components/TeacherFilter/filter";
import TeacherPageComponents from "../components/TeacherCard/TeacherPageComponents";
import Pagination from "../components/Pagination/Pagination";
import "./TeachersPage.css";
import { useResponsive } from "../../../useResponsive";

function EmptyStateDemo() {
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({});
  const [bookmarkedTeachers, setBookmarkedTeachers] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useResponsive(1024);
  const handleToggleBookmark = (teacherId: number) => {
    setBookmarkedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  return (
    <div className="teachers-page-container">
      {!isMobile && <Sidebar />}
      <Header
        title="Demo Empty State"
        script="Test empty state component khi không tìm thấy giảng viên"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />

      {isMobile && (
        <>
          <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
            <Sidebar isMobile={true} />
          </div>
          {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
        </>
      )}
      <div className="teachers-page">
        <TeacherFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearch={(filters) => {
            console.log("Filters applied: ", filters);
          }}
        />

        {/* Demo Controls */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            margin: "20px 20px 20px 0",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", color: "#333" }}>Demo Controls</h3>
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setShowEmptyState(!showEmptyState)}
              style={{
                background: showEmptyState ? "#e53e3e" : "#38a169",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {showEmptyState ? "Hiện danh sách" : "Hiện Empty State"}
            </button>

            <input
              type="text"
              placeholder="Thử tìm 'xyz' để test empty state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                minWidth: "300px",
              }}
            />

            <span style={{ color: "#718096", fontSize: "14px" }}>
              {searchQuery && !showEmptyState
                ? `Tìm kiếm: "${searchQuery}"`
                : "Nhập từ khóa không tồn tại để test"}
            </span>
          </div>
        </div>

        <h1 className="h1">
          {showEmptyState ? "Demo Empty State" : "Danh sách giảng viên"}
        </h1>

        <div className="teachers-page-components">
          <TeacherPageComponents
            teachers={[]} // hoặc mock teachers
            searchQuery={searchQuery}
            showEmptyState={showEmptyState}
            filters={filters}
            activeTab={activeTab}
            bookmarkedTeachers={bookmarkedTeachers}
            onToggleBookmark={handleToggleBookmark}
          />
        </div>

        {!showEmptyState &&
          (!searchQuery ||
            searchQuery === "Lê Văn Cường" ||
            searchQuery === "Nguyễn Văn An") && (
            <Pagination currentPage={1} totalPages={10} />
          )}
      </div>
    </div>
  );
}

export default EmptyStateDemo;
