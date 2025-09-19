import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import TeacherPageComponents, {
  TeacherCardData,
} from "../components/TeacherCard/TeacherPageComponents";
import TeacherFilter from "../components/TeacherFilter/filter";
import Pagination from "../components/Pagination/Pagination";
import {
  getAllLecturerAPI,
  getCoursesByLecturerAPI,
} from "../apis/TeacherPageApis";
import "./TeachersPage.css";
import MyReviewsList from "../components/ReviewDetail/MyReviewsList";
import { getMyReviewsAPI } from "../../home/apis";

function TeachersPage() {
  const [lecturers, setLecturers] = useState<TeacherCardData[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [bookmarkedTeachers, setBookmarkedTeachers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleToggleBookmark = (teacherId: number) => {
    setBookmarkedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const mapLecturerToTeacher = (
    lecturer: any,
    subjectCount = 0
  ): TeacherCardData => ({
    id: lecturer.id, // thêm id từ API
    name: lecturer.fullName || lecturer.name,
    username: lecturer.code || lecturer.username,
    avatar: lecturer.avatarUrl || "/default-avatar.png",
    courses:
      lecturer.campus?.university?.courses?.map((c: any) => c.name) || [],
    rating: lecturer.rating || 0,
    reviews: lecturer.reviewCount || 0,
    subjects: subjectCount,
  });

  const fetchLecturers = async () => {
    setLoading(true);
    try {
      if (activeTab === "myreviews") {
        return;
      }

      const res = await getAllLecturerAPI({
        page,
        size: 9,
        ...filters,
      });

      console.log("getAllLecturerAPI res:", res);

      const possibleList =
        res?.result?.data ?? res?.result ?? res?.data ?? res ?? [];
      const items = Array.isArray(possibleList)
        ? possibleList
        : possibleList?.content ?? [];

      const mapped = await Promise.all(
        items.map(async (lec: any) => {
          if (!lec?.id) {
            console.warn("Lecturer has no id, fallback mapping:", lec);
            return mapLecturerToTeacher(lec);
          }

          try {
            const courseRes = await getCoursesByLecturerAPI(lec.id);
            console.log(`courses for lec ${lec.id}:`, courseRes);
            const subjectCount =
              courseRes?.result?.length ??
              (Array.isArray(courseRes) ? courseRes.length : 0);

            return mapLecturerToTeacher(lec, subjectCount);
          } catch (err) {
            console.warn("getCoursesByLecturerAPI failed for id", lec.id, err);
            return mapLecturerToTeacher(lec, 0);
          }
        })
      );

      setLecturers(mapped);
      setTotalPages(res?.result?.totalPages ?? res?.totalPages ?? 1);
    } catch (error) {
      console.error("fetchLecturers error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "rated") {
      setFilters({ isReviewed: true });
    } else if (activeTab === "marked") {
      setFilters({ isMarked: true });
    } else if (activeTab === "myreviews") {
      setFilters({});
    } else {
      setFilters({});
    }
    setPage(1);
  }, [activeTab]);

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
          onSearch={(newFilters) => {
            const filtersWithTab: any = { ...newFilters };

            if (activeTab === "rated") {
              filtersWithTab.isReviewed = true;
            } else if (activeTab === "marked") {
              filtersWithTab.isMarked = true;
            }

            setFilters(filtersWithTab);
            setPage(1);
          }}
        />

        <h1 className="h1">
          {activeTab === "myreviews"
            ? "Review của tôi"
            : "Danh sách giảng viên"}
        </h1>

        <div
          className={
            activeTab === "myreviews"
              ? "my-reviews-container"
              : "teachers-page-components"
          }
        >
          {activeTab === "myreviews" ? (
            <MyReviewsList
              page={page}
              size={9}
              onTotalPages={(total) => setTotalPages(total)}
            />
          ) : (
            <TeacherPageComponents
              teachers={lecturers}
              searchQuery={searchQuery}
              showEmptyState={lecturers.length === 0}
              filters={filters}
              activeTab={activeTab}
              bookmarkedTeachers={bookmarkedTeachers}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
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
