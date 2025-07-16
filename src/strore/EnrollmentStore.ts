import { create } from "zustand";
import { enrollmentService } from "@/services/enrollmentService";

interface EnrollmentState {
    isEnrolled: boolean;
    checkEnrollment: (courseId: number) => Promise<void>;
    enrollCourse: (courseId: number) => Promise<void>;
    cancelEnrollment: (courseId: number) => Promise<void>;
}

export const useEnrollmentStore = create<EnrollmentState>((set) => ({
    isEnrolled: false,

    checkEnrollment: async (courseId) => {
        const res = await enrollmentService.checkEnrollment(courseId);
        set({ isEnrolled: res.data.isEnrolled });
    },

    enrollCourse: async (courseId) => {
        await enrollmentService.enroll(courseId);
        set({ isEnrolled: true });
    },

    cancelEnrollment: async (courseId) => {
        await enrollmentService.cancelEnrollment(courseId);
        set({ isEnrolled: false });
    },
}));
