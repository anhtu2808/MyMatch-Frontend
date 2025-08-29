import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export interface CommonEntity{
    createAt?: string;
    updateAt?: string;
    deleted?: number;
}

export interface Lecturer extends CommonEntity {
    id : number;
    name: string;
    code?: string;
    bio?: string;
    reviews?: Review[];
    campus: Campus;
    tags?: Tag[];
}

export interface Campus extends CommonEntity {
    id: number;
    name: string;
    address?: string;
    lecturers?: Lecturer[];
}

export interface Review extends CommonEntity {
    id: number;
    content?: string;
    lecturer: Lecturer;
}

export interface Tag extends CommonEntity {
    id: number;
    name: string;
}

export interface LecturerFilter {
    campusId?: number;
    name?: string;
    code?: string;
}

export const getLecturers = async (
    filters: LecturerFilter
): Promise<Lecturer[]> => {
    const response = await axios.get(API_BASE_URL, {params: filters});
    return response.data;
};