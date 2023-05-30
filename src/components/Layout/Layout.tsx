import style from "./style.module.css"
import Header from "./../Header/Header"
import Footer from "../Footer/Footer"
import TaskPage from "../../pages/task/TaskPage"
import Main from "../../pages/main/Main"
import { Route, Routes } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className={style.layout}>
            <Header />
            <div className={style.mainContainer}>
                <Routes>
                    <Route path='/' element={<Main/>}></Route>
                    <Route path="/:groupName/:ticketId" element={<TaskPage />}></Route>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout