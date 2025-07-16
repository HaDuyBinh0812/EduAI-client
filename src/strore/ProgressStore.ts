import { create } from "zustand";
import { progressService } from "@/services/progressService";

interface Progress {
    id: number;
    userId: number;
    lessonId: number;
    percentage: number;
    lastViewedAt: string;
    lesson: {
        id: number;
        title: string;
        sectionId: number;
    };
}

interface ProgressState {
    progresses: Progress[];
    courseProgressPercent: number;
    lastViewedLesson: Progress["lesson"] | null;
    fetchProgress: (courseId: number) => Promise<void>;
    fetchProgressSummary: (courseId: number) => Promise<void>;
    fetchLastViewedLesson: (courseId: number) => Promise<void>;
    updateProgress: (lessonId: number, percentage: number) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set) => ({
    progresses: [],
    courseProgressPercent: 0,
    lastViewedLesson: null,

    fetchProgress: async (courseId) => {
        const res = await progressService.getCourseProgress(courseId);
        set({ progresses: res.data.progresses });
    },

    fetchProgressSummary: async (courseId) => {
        const res = await progressService.getCourseProgressSummary(courseId);
        set({ courseProgressPercent: res.data.percentage });
    },

    fetchLastViewedLesson: async (courseId) => {
        const res = await progressService.getLastViewedLesson(courseId);
        set({ lastViewedLesson: res.data.lesson });
    },

    updateProgress: async (lessonId, percentage) => {
        await progressService.updateProgress(lessonId, percentage);
    },
}));
