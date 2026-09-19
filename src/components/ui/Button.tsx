type ButtonProps = {
    label: string;
    onClick?: () => void;
    type?: "submit" | "button" | "reset";
    disabled?: boolean;
};

export const Button = ({ label, onClick, type = "button", disabled }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};
