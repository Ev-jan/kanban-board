import { AppContext } from "../../App"
import { useContext, useEffect, useState } from "react"
import style from "./style.module.css"
import { TicketGroup } from "../../types";

const Footer: React.FC = () => {
    const { data } = useContext(AppContext);
    const [activeTasks, setActiveTasks] = useState(0);
    const [finishedTasks, setFinishedTasks] = useState(0);

    useEffect(() => {
        if (data) {
          let selectedActive = 0;
          let selectedFinished = 0;
    
          data.forEach((tickets, group) => {
            if (group === TicketGroup.Finished) {
              selectedFinished = tickets.length;
            } else {
              selectedActive += tickets.length;
            }
          });
          setActiveTasks(selectedActive);
          setFinishedTasks(selectedFinished);
        }
      }, [data]);

    return (
        <footer className={style.footer}>
            <div className={style.taskStatusCount}>
                <p className={style.activeTasks}>Active tasks: {activeTasks}</p>
                <p className={style.finishedTasks}>Finished tasks: {finishedTasks}</p>
            </div>
            <p className={style.copyright}>Kanban board by Evgen, 2023</p>
        </footer>
    )
}

export default Footer