import axiosInstance from "./axiosInstance";

export const progressService = {
    updateProgress: (lessonId: number, percentage: number) =>
        axiosInstance.post("/progress", { lessonId, percentage }),

    getCourseProgress: (courseId: number) =>
        axiosInstance.get(`/progress/${courseId}`),

    getCourseProgressSummary: (courseId: number) =>
        axiosInstance.get(`/progress/${courseId}/summary`),

    getLastViewedLesson: (courseId: number) =>
        axiosInstance.get(`/progress/${courseId}/last-viewed`),
};
