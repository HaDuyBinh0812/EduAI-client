import axiosInstance from "./axiosInstance";

export const courseService = {
    getCourses: (params?: { search?: string; categoryId?: number }) =>
        axiosInstance.get("/course", { params }),

    getCourseDetail: (slug: string) => axiosInstance.get(`/course/${slug}`),

    createCourse: (formData: FormData) =>
        axiosInstance.post("/course", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
};
