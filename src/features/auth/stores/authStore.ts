import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    login,
    logout,
    register as registerApi,
    GetCurrentUser,
} from "../services/authService";
import type { LoginSchema } from "../schemas/loginSchema";

type User = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
};

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoadingUser: boolean; // thêm trạng thái này
    login: (data: LoginSchema) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
    fetchCurrentUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoadingUser: true,

            login: async (data) => {
                const res = await login(data);
                const user = res.data.user;
                set({ user, isAuthenticated: true });
            },

            register: async (data) => {
                const res = await registerApi(data);
                const user = res.data.user;
                set({ user, isAuthenticated: true });
            },

            logout: async () => {
                await logout();
                set({ user: null, isAuthenticated: false });
            },

            fetchCurrentUser: async () => {
                try {
                    const res = await GetCurrentUser();
                    const user = res.data.user;
                    set({ user, isAuthenticated: true, isLoadingUser: false });
                } catch (error) {
                    console.log(error);

                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoadingUser: false,
                    });
                }
            },
        }),
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
