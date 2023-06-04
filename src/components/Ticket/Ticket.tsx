import { ITicket, TicketGroup } from "../../types";
import style from "./style.module.css";
import { useNavigate } from 'react-router-dom';
type TicketProps = {
    ticket: ITicket,
    groupName: TicketGroup;
}

const Ticket:React.FC<TicketProps> = ({ticket, groupName}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${groupName}/${ticket.id}`, { state: { ticket, groupName } });
    };
    
    return (
        <li
            className={style.ticket}
            data-id={ticket.id}
            onClick={handleClick}
            >
            {ticket.name}
        </li>
    )
}

export default Ticket