import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Tên không được để trống" })
            .min(2, { message: "Tên quá ngắn" }),

        email: z
            .email({ message: "Email không hợp lệ" })
            .min(1, { message: "Email không được để trống" }),

        password: z
            .string()
            .min(1, { message: "Mật khẩu không được để trống" })
            .min(6, { message: "Mật khẩu ít nhất 6 ký tự" }),

        confirmPassword: z.string().min(1, {
            message: "Vui lòng nhập lại mật khẩu",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
