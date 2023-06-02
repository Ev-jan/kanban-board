import TaskBlock from "../../components/TaskBlock/TaskBlock";
import { TicketGroup } from "../../types";
import style from "./style.module.css"

const Main = () => {
    return (
        <main className={style.main}>
            <TaskBlock
                currentGroupName={TicketGroup.Backlog}
            />
            <TaskBlock
                currentGroupName={TicketGroup.Ready}
            />
            <TaskBlock
                currentGroupName={TicketGroup.InProgress}
            />
            <TaskBlock
                currentGroupName={TicketGroup.Finished}
            />
        </main>
    )
}

export default Main