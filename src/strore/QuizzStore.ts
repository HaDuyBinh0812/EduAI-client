// src/strore/QuizStore.ts
import { quizService } from "@/services/quizzService";
import { create } from "zustand";

export type Quiz = {
    id: number;
    lessonId: number;
    question: string;
    type: "FILL" | "SINGLE_CHOICE" | "MULTI_CHOICE";
    options?: string[] | null;
    answer: string | string[];
};

type AnswerPayload = {
    quizId: number;
    answer: string | string[];
};

type QuizResult = {
    quizId: number;
    correct: boolean;
};

interface QuizState {
    quizzes: Quiz[];
    results: QuizResult[] | null;
    score: string | null;
    fetchQuizzes: (lessonId: number) => Promise<void>;
    submitAnswers: (
        lessonId: number,
        answers: AnswerPayload[]
    ) => Promise<void>;
    deleteQuiz: (quizId: number) => Promise<void>;
    clearResults: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
    quizzes: [],
    results: null,
    score: null,

    fetchQuizzes: async (lessonId) => {
        const res = await quizService.getQuizzesByLesson(lessonId);
        set({ quizzes: res.data.quizzes });
    },

    submitAnswers: async (lessonId, answers) => {
        const res = await quizService.submitAnswers(lessonId, answers);
        set({
            results: res.data.results,
            score: res.data.score,
        });
    },

    deleteQuiz: async (quizId) => {
        await quizService.deleteQuiz(quizId);
        set({
            quizzes: get().quizzes.filter((q) => q.id !== quizId),
        });
    },

    clearResults: () => {
        set({ results: null, score: null });
    },
}));
