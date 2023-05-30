import TaskBlock from "../../components/TaskBlock/TaskBlock";
import style from "./style.module.css"



const Main = () => {
    return (
        <main className={style.main}>
            <TaskBlock
                groupName="Backlog"
            />
            <TaskBlock
                groupName="Ready"
            />
            <TaskBlock
                groupName="In Progress"
            />
            <TaskBlock
                groupName="Finished"
            />
        </main>
    )
}

export default Main