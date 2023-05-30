import { ITicket } from "../../types";
import style from "./style.module.css";
import { useNavigate } from 'react-router-dom';
type TicketProps = {
    ticket: ITicket,
    groupName: "Backlog" | "Ready" | "In Progress" | "Finished";
}

const Ticket:React.FC<TicketProps> = ({ticket, groupName}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${groupName}/${ticket.id}`, { state: { groupName, ticket } });
    };
    
    return (
        <li
            className={style.ticket}
            onClick={handleClick}
            >
            {ticket.name}
        </li>

    )
}

export default Ticket