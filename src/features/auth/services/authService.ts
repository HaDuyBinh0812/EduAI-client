import axiosInstance from "@/services/axiosInstance";

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
    name: string;
}

export const login = (data: LoginPayload) => {
    return axiosInstance.post("/auth/login", data);
};

export const logout = () => {
    return axiosInstance.post("/auth/logout");
};

export const GetCurrentUser = () => {
    return axiosInstance.get("/auth/me");
};

export const register = (data: RegisterPayload) => {
    return axiosInstance.post("/auth/register", data);
};
