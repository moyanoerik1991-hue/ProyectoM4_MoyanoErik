type InputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "date" | "time" | "email" | "number";
    placeholder?: string;
    maxLength?: number;
    min?: string;
    max?: string;
};

export const Input = ({ label, value, onChange, type = "text", placeholder, maxLength, min, max }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input placeholder={placeholder} type={type} value={value} onChange={onChange} maxLength={maxLength} min={min} max={max} />
        </>
    );
};
