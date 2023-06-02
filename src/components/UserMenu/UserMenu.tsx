import { MouseEventHandler, useRef, useState } from "react"
import style from "./style.module.css"

const UserMenu: React.FC = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const dropDownRef = useRef<HTMLDivElement>(null)


    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        isMenuHidden ? setIsMenuHidden(false) : setIsMenuHidden(true);
    }

    return (
        <div className={style.profileMenu}>
            <div className={style.innerContainer}>
                <div className={style.avContainer}>
                </div>

                <button
                    onClick={handleButtonClick}
                    className={style.dropDownBtn}>
                    <svg
                        style={{
                            transform: isMenuHidden ? "rotate(360deg)" : "rotate(180deg)",
                            transition: "transform ease-out 1s"
                        }}
                        className={style.dropDownBtnChevron}
                        width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z" fill="white" />
                    </svg>
                </button>
            </div>
            {!isMenuHidden && (
                <div className={style.dropDown} ref={dropDownRef}>
                    <div className={style.pimple}></div>
                    <ul className={style.dropDownContent}>
                        <li className={style.dropDownItem}><button>Profile</button></li>
                        <li className={style.dropDownItem}><button>Log Out</button></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserMenu