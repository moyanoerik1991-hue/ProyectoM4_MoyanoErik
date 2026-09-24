import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export const PasswordInput = ({
    label,
    value,
    onChange,
    placeholder,
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {label && <label>{label}</label>}

            <div className="password-input-wrapper">

                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />

                {/* Toggle derecha */}
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                        setShowPassword((previous) => !previous)
                    }
                    aria-label={
                        showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                    }
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );
};