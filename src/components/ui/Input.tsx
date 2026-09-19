type InputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ label, value, onChange }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input type="text" value={value} onChange={onChange} />
        </>
    );
};
