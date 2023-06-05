import TaskBlock from "../../components/TaskBlock/TaskBlock";
import { TicketGroup } from "../../types";
import style from "./style.module.css";


type MainProps = {
    ticketGroups: { groupName: TicketGroup }[]
}

const Main: React.FC<MainProps> = ({ ticketGroups }) => {
    return (
        <main className={style.main}>
            {ticketGroups.map((group, index) => (<TaskBlock key={index} currentGroupName={group.groupName} />))}
        </main>
    )
}

export default Main