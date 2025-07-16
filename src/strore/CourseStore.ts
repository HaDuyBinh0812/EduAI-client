import { courseService } from "@/services/courseServices";
import { create } from "zustand";

export interface Course {
    id: number;
    title: string;
    description: string;
    slug: string;
    thumbnail: string;
    categoryId: number;
    createdAt: string;
    category: {
        id: number;
        name: string;
    };
    totalLessons: number;
    totalDuration: number;
    youWillLearn: string[];
    requirements: string[];
}

export interface CourseDetail extends Course {
    sections: {
        id: number;
        title: string;
        courseId: number;
        lessons: {
            id: number;
            title: string;
            contentUrl: string;
            duration: number;
        }[];
    }[];
}

interface CourseState {
    courses: Course[];
    courseDetail: CourseDetail | null;
    fetchCourses: (params?: {
        search?: string;
        categoryId?: number;
    }) => Promise<void>;
    fetchCourseDetail: (slug: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    courseDetail: null,

    fetchCourses: async (params) => {
        const res = await courseService.getCourses(params);
        set({ courses: res.data.courses });
    },

    fetchCourseDetail: async (slug) => {
        const res = await courseService.getCourseDetail(slug);
        set({ courseDetail: res.data.course });
    },
}));
