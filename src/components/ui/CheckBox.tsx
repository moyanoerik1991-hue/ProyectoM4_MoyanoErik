type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                {label}
            </label>
        </>
    );
};