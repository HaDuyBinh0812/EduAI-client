// src/strore/LessonStore.ts

import { lessonService } from "@/services/lessonService";
import { create } from "zustand";

export interface Lesson {
    id: number;
    title: string;
    contentUrl: string;
    order: number;
    sectionId: number;
}

interface LessonState {
    lessons: Lesson[];
    fetchLessons: (sectionId: number) => Promise<void>;
    createLesson: (data: {
        title: string;
        order?: number;
        sectionId: number;
        video: File;
    }) => Promise<void>;
    deleteLesson: (lessonId: number) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set, get) => ({
    lessons: [],

    fetchLessons: async (sectionId) => {
        const res = await lessonService.getLessons(sectionId);
        set({ lessons: res.data.lessons });
    },

    createLesson: async (data) => {
        await lessonService.createLesson(data);
        await get().fetchLessons(data.sectionId);
    },

    deleteLesson: async (lessonId) => {
        await lessonService.deleteLesson(lessonId);
        const currentLessons = get().lessons;
        set({
            lessons: currentLessons.filter((lesson) => lesson.id !== lessonId),
        });
    },
}));
