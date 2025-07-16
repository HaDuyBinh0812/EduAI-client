import { AxiosError } from "axios";

type ApiError = {
    message?: string;
    errors?: Record<string, string[]>; // support kiểu: { email: ['Email is invalid'] }
};

export interface ParsedError {
    message: string;
    status?: number;
    fieldErrors?: Record<string, string[]>;
}

export const parseAxiosError = (error: unknown): ParsedError => {
    const fallback: ParsedError = {
        message: "Có lỗi xảy ra. Vui lòng thử lại.",
    };

    if (!error || typeof error !== "object") return fallback;

    const axiosError = error as AxiosError<ApiError>;

    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    return {
        message: data?.message || fallback.message,
        status,
        fieldErrors: data?.errors,
    };
};
