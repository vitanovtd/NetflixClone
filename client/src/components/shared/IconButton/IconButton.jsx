import "./IconButton.css";

const IconButton = ({ icon = "", color = "white", size = "1rem", type = "button", onClick, onMouseDown }) => {

    return (
        <button type={type} className='IconButton' onClick={onClick} onMouseDown={onMouseDown} >
            <i style={{ color, fontSize: size, }} className={`${icon} IconButton__icon`} ></i>
        </button >
    )
}

export default IconButton;
