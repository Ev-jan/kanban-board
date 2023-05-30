import style from "./style.module.css"
import UserMenu from "../UserMenu/UserMenu"


const Header: React.FC = () => {

    return (
        <header className={style.header}>
            <p className={style.logo}>Awesome Kanban Board</p>
            <UserMenu />
        </header>
    )
}

export default Header