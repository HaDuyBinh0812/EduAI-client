import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email({ message: "Email không hợp lệ" })
        .min(1, { message: "Email không được để trống" }),

    password: z
        .string()
        .min(1, { message: "Mật khẩu không được để trống" })
        .min(6, { message: "Mật khẩu ít nhất 6 ký tự" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
