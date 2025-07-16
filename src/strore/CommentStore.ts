// src/strore/CommentStore.ts
import { commentService } from "@/services/commentServices";
import { create } from "zustand";

interface Comment {
    id: number;
    content: string;
    lessonId: number;
    user: {
        id: number;
        name: string;
    };
    createdAt: string;
}

interface CommentState {
    comments: Comment[];
    fetchComments: (lessonId: number) => Promise<void>;
    addComment: (lessonId: number, content: string) => Promise<void>;
    deleteComment: (commentId: number) => Promise<void>;
    clearComments: () => void;
}

export const useCommentStore = create<CommentState>((set, get) => ({
    comments: [],

    fetchComments: async (lessonId) => {
        const res = await commentService.getCommentsByLesson(lessonId);
        set({ comments: res.data.comments });
    },

    addComment: async (lessonId, content) => {
        const res = await commentService.createComment(lessonId, content);
        set({ comments: [res.data.comment, ...get().comments] });
    },

    deleteComment: async (commentId) => {
        await commentService.deleteComment(commentId);
        set({
            comments: get().comments.filter((c) => c.id !== commentId),
        });
    },

    clearComments: () => set({ comments: [] }),
}));
