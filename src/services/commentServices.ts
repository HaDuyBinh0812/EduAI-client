// src/services/commentService.ts
import axiosInstance from "./axiosInstance";

export const commentService = {
    getCommentsByLesson: (lessonId: number) =>
        axiosInstance.get(`/comment/${lessonId}`),

    createComment: (lessonId: number, content: string) =>
        axiosInstance.post("/comment", { lessonId, content }),

    deleteComment: (commentId: number) =>
        axiosInstance.delete(`/comment/${commentId}`),
};
