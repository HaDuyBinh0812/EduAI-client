import type { FieldError } from "react-hook-form";

interface Props {
    error?: FieldError;
    className?: string;
}

const FieldErrorText = ({ error, className }: Props) => {
    if (!error) return null;

    return (
        <p className={`text-sm text-red-500 ${className || ""}`}>
            {error.message}
        </p>
    );
};

export default FieldErrorText;
