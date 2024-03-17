import "./BasicButton.css";

const BasicButton = ({ variant = "solid", color="crimson", label="label", onClick }) => {

    return (
        <button
            className={`BasicButton ${variant} ${color}`}
            onClick={onClick}
        >
            <span>{label}</span>
        </button>
    )
}

export default BasicButton;
