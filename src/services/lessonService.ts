// src/services/lessonService.ts

import axiosInstance from "./axiosInstance";

export const lessonService = {
    getLessons: (sectionId: number) =>
        axiosInstance.get(`/lesson/${sectionId}`),

    createLesson: (data: {
        title: string;
        order?: number;
        sectionId: number;
        video: File;
    }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("sectionId", data.sectionId.toString());
        if (data.order !== undefined) {
            formData.append("order", data.order.toString());
        }
        formData.append("video", data.video);

        return axiosInstance.post(`/lesson`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    deleteLesson: (lessonId: number) =>
        axiosInstance.delete(`/lesson/${lessonId}`),
};
