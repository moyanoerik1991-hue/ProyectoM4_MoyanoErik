type SelectProps<T extends string> = {
    label: string;
    value: T;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: T; label: string }[];
};

export const Select = <T extends string,>({ label, value, onChange, options }: SelectProps<T>) => {
    return (
        <>
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </>
    );
};
