// src/strore/SectionStore.ts

import { sectionService } from "@/services/sectionService";
import { create } from "zustand";

export interface Lesson {
    id: number;
    title: string;
    contentUrl: string;
    duration: number;
    sectionId: number;
}

export interface Section {
    id: number;
    title: string;
    order: number;
    courseId: number;
    lessons: Lesson[];
}

interface SectionState {
    sections: Section[];
    fetchSections: (courseId: number) => Promise<void>;
    createSection: (data: {
        title: string;
        order?: number;
        courseId: number;
    }) => Promise<void>;
    deleteSection: (sectionId: number) => Promise<void>;
}

export const useSectionStore = create<SectionState>((set, get) => ({
    sections: [],

    fetchSections: async (courseId) => {
        const res = await sectionService.getSections(courseId);
        set({ sections: res.data.sections });
    },

    createSection: async (data) => {
        await sectionService.createSection(data);
        await get().fetchSections(data.courseId);
    },

    deleteSection: async (sectionId) => {
        await sectionService.deleteSection(sectionId);
        // ⚡️ Reload lại cho chắc
        const currentSections = get().sections;
        set({
            sections: currentSections.filter((s) => s.id !== sectionId),
        });
    },
}));
