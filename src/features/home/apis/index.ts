import api from "../../../utils";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

type MyToken = JwtPayload & {
  studentId: number;
};

const getToken = () => localStorage.getItem("accessToken");

export const getStudentIdFromToken = (): number | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<MyToken>(token);
    return decoded.studentId ?? null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

interface ReviewActivity {
  id: number;
  lecturerName: string;
  createdAt: string;
  overallScore: number;
}

export const getLatestReviewActivityAPI =
  async (): Promise<ReviewActivity | null> => {
    const studentId = getStudentIdFromToken();
    if (!studentId) return null;

    try {
      const res = await api.get("/reviews", {
        params: {
          studentId,
          page: 1,
          size: 1,
          sortBy: "createAt",
          sortDirection: "DESC",
        },
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = res.data?.result?.data?.[0];
      if (!data) return null;

      return {
        id: data.id,
        lecturerName: data.lecturer?.name || "Unknown",
        createdAt: data.createAt ?? new Date().toISOString(),
        overallScore: data.overallScore ?? 0,
      };
    } catch (err) {
      console.error("Error fetching recent activity", err);
      return null;
    }
  };

interface SwapActivity {
  id: number;
  fromClass: string;
  targetClass: string;
  status: string;
  createdAt: string;
}

export const getLatestSwapActivityAPI =
  async (): Promise<SwapActivity | null> => {
    const studentId = getStudentIdFromToken();
    if (!studentId) return null;

    try {
      const res = await api.get("/swap-requests", {
        params: {
          studentId,
          page: 1,
          size: 1,
          sortBy: "createAt",
          sortDirection: "DESC",
        },
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = res.data?.result?.data?.[0];
      if (!data) return null;

      return {
        id: data.id,
        fromClass: data.fromClass,
        targetClass: data.targetClass,
        status: data.status,
        createdAt: data.createAt,
      };
    } catch (err) {
      console.error("Error fetching swap activity", err);
      return null;
    }
  };
interface LecturerActivity {
  id: number;
  name: string;
  code: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  createAt: string;
}

export const getLatestLecturerActivityAPI =
  async (): Promise<LecturerActivity | null> => {
    try {
      const res = await api.get("/lecturers", {
        params: {
          isReviewed: true,
          page: 1,
          size: 1,
          sort: "createAt",
        },
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = res.data?.result?.data?.[0];
      if (!data) return null;

      return {
        id: data.id,
        name: data.fullName || data.name,
        code: data.code,
        avatarUrl: data.avatarUrl || "/default-avatar.png",
        rating: data.rating ?? 0,
        reviewCount: data.reviewCount ?? 0,
        createAt: data.createAt ?? new Date().toISOString(),
      };
    } catch (err) {
      console.error("Error fetching lecturer activity", err);
      return null;
    }
  };

export const getMyReviewsAPI = async (
  page = 1,
  size = 10
): Promise<{
  data: {
    id: number;
    lecturerName: string;
    courseName: string;
    semesterName: string;
    overallScore: number;
    isAnonymous: boolean;
    createdAt: string;
    isVerified: boolean;
  }[];
  totalPages: number;
}> => {
  const studentId = getStudentIdFromToken();
  if (!studentId) return { data: [], totalPages: 0 };

  const res = await api.get("/reviews", {
    params: {
      studentId,
      page,
      size,
      sortBy: "createAt",
      sortDirection: "DESC",
    },
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  const items = res.data?.result?.data ?? [];
  const totalPages = res.data?.result?.totalPages ?? 1;

  return {
    data: items.map((r: any) => ({
      id: r.id,
      lecturerName: r.lecturer?.name ?? "Unknown",
      courseName: r.course?.name ?? "Không rõ môn",
      semesterName: r.semester?.name ?? "Không rõ kỳ",
      overallScore: r.overallScore ?? 0,
      isAnonymous: r.isAnonymous ?? false,
      createdAt: r.createAt ?? new Date().toISOString(),
      isVerified: r.isVerified ?? false,
    })),
    totalPages,
  };
};

export const deleteReviewAPI = async (reviewId: number) => {
  return api.delete(`/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
