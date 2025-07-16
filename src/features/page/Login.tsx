import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseAxiosError } from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/stores/authStore";
import { loginSchema, type LoginSchema } from "../auth/schemas/loginSchema";
import FieldErrorText from "@/components/shared/FieldError";

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            await login(data);
            navigate("/");
        } catch (err) {
            const parsed = parseAxiosError(err);

            if (parsed.message) {
                setError("root", { message: parsed.message });
            }

            if (parsed.fieldErrors) {
                Object.entries(parsed.fieldErrors).forEach(
                    ([field, messages]) => {
                        setError(field as keyof LoginSchema, {
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
            <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>

            {errors.root && (
                <p className="text-sm text-red-500 text-center">
                    {errors.root.message}
                </p>
            )}

            <div>
                <Input
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                />
                <FieldErrorText error={errors.email} />
            </div>

            <div>
                <Input
                    {...register("password")}
                    placeholder="Mật khẩu"
                    type="password"
                    autoComplete="current-password"
                />
                <FieldErrorText error={errors.password} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
        </form>
    );
};

export default Login;
