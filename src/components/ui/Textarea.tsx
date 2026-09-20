type TextareaProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    maxLength?: number;
}

export const Textarea = ({ label, value, onChange, placeholder, maxLength }: TextareaProps) => {
    return (
        <>
            <label>{label}</label>
            <textarea placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength} />
            <span>{value.length}/{maxLength}</span>
        </>
    );
}