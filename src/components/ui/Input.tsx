type InputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "date" | "time";
};

export const Input = ({ label, value, onChange, type = "text" }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} />
        </>
    );
};
