import api from "../../../utils";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

type MyToken = JwtPayload & {
  studentId: number;
};

const getToken = () => localStorage.getItem("token");

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
