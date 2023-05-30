import { AppContext } from "../../App"
import { useContext, useEffect, useState } from "react"
import style from "./style.module.css"

const Footer: React.FC = () => {
    const { data } = useContext(AppContext);
    const [activeTasks, setActiveTasks] = useState(0);
    const [finishedTasks, setFinishedTasks] = useState(0);

useEffect(()=>{
    if(data){
        const selectedActive = data.reduce((acc, curr) => {
            return curr.groupName !== "Finished" ? acc + curr.tickets.length : acc + 0;
        }, 0);
        setActiveTasks(selectedActive);
        const selectedFinished = data.find((obj) => { return obj.groupName === "Finished"; })!.tickets.length;
        setFinishedTasks(selectedFinished);
    }
}, [data])

    return (
        <footer className={style.footer}>
            <div className={style.taskBlock}>
                <p className={style.activeTasks}>Active tasks: {activeTasks}</p>
                <p className={style.finishedTasks}>Finished tasks: {finishedTasks}</p>
            </div>
            <p className={style.copyright}>Kanban board by Evjan, 2023</p>
        </footer>
    )
}

export default Footer