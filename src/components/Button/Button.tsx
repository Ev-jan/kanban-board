import style from "./style.module.css"
import React from "react"

type ButtonProps = {
    handleButtonClick: ()=> void;
    inputValue: string;
    isInputHidden: boolean;
}
const Button: React.FC<ButtonProps> = ({handleButtonClick, inputValue, isInputHidden}) => {
return (
    <button
    onClick={handleButtonClick}
    disabled={inputValue.trim().length === 0 && !isInputHidden}
    className={inputValue.trim().length === 0 ? `${style.addBtn}` : `${style.submitBtn}`}>
    <span className={style.text}>
        {inputValue.trim().length === 0 ? "Add card" : "Submit"}
    </span>
</button>
)
}

export default Button