import axiosInstance from "./axiosInstance";

export const enrollmentService = {
    enroll: (courseId: number) =>
        axiosInstance.post("/enrollment", { courseId }),

    checkEnrollment: (courseId: number) =>
        axiosInstance.get(`/enrollment/${courseId}`),

    cancelEnrollment: (courseId: number) =>
        axiosInstance.delete(`/enrollment/${courseId}`),
};
