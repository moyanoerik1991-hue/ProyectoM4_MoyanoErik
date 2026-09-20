type InputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "date" | "time";
    placeholder?: string;
    maxLength?: number;
};

export const Input = ({ label, value, onChange, type = "text", placeholder, maxLength }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input placeholder={placeholder} type={type} value={value} onChange={onChange} maxLength={maxLength} />
        </>
    );
};
