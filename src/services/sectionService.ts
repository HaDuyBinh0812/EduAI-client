import axiosInstance from "./axiosInstance";

export const sectionService = {
    getSections: (courseId: number) =>
        axiosInstance.get(`/section/${courseId}`),

    createSection: (data: {
        title: string;
        order?: number;
        courseId: number;
    }) => axiosInstance.post(`/section`, data),

    deleteSection: (sectionId: number) =>
        axiosInstance.delete(`/section/${sectionId}`),
};
