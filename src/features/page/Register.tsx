import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseAxiosError } from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/stores/authStore";
import {
    registerSchema,
    type RegisterSchema,
} from "../auth/schemas/registerSchema";
import FieldErrorText from "@/components/shared/FieldError";

const Register = () => {
    const navigate = useNavigate();
    const registerUser = useAuthStore((state) => state.register);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            navigate("/");
        } catch (err) {
            const parsed = parseAxiosError(err);

            if (parsed.message) {
                setError("root", { message: parsed.message });
            }

            if (parsed.fieldErrors) {
                Object.entries(parsed.fieldErrors).forEach(
                    ([field, messages]) => {
                        setError(field as keyof RegisterSchema, {
                            message: messages[0],
                        });
                    }
                );
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4"
        >
            <h1 className="text-2xl font-semibold text-center">Đăng ký</h1>

            {errors.root && (
                <p className="text-sm text-red-500 text-center">
                    {errors.root.message}
                </p>
            )}

            <div>
                <Input {...register("name")} placeholder="Tên của bạn" />
                <FieldErrorText error={errors.name} />
            </div>

            <div>
                <Input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                />
                <FieldErrorText error={errors.email} />
            </div>

            <div>
                <Input
                    {...register("password")}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Mật khẩu"
                />
                <FieldErrorText error={errors.password} />
            </div>

            <div>
                <Input
                    {...register("confirmPassword")}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Nhập lại mật khẩu"
                />
                <FieldErrorText error={errors.confirmPassword} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </Button>
        </form>
    );
};

export default Register;
