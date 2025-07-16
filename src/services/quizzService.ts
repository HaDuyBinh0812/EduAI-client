// src/services/quizService.ts
import axiosInstance from "./axiosInstance";

export const quizService = {
    getQuizzesByLesson: (lessonId: number) =>
        axiosInstance.get(`/quizz/${lessonId}`),

    submitAnswers: (
        lessonId: number,
        answers: { quizId: number; answer: string | string[] }[]
    ) => axiosInstance.post(`/quizz/submit`, { lessonId, answers }),

    deleteQuiz: (quizId: number) => axiosInstance.delete(`/quizze/${quizId}`),
};
