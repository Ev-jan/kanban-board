import { useContext, useEffect, useState } from "react"
import { ITicket } from "../../types"
import style from "./style.module.css"
import { AppContext } from "../../App"
import { useLocation, Link  } from "react-router-dom"

const TaskPage: React.FC = () => {
    const location = useLocation();
    const [ticket, setTicket] = useState<ITicket>(location.state.ticket);
    const [description, setDescription] = useState("");
    const { data, updateData } = useContext(AppContext);
    const { groupName } = location.state;

    useEffect(() => {
        if (data) {
            const selectedGroup = data.find((selected) => selected.groupName === groupName);
            const selectedTicket = selectedGroup?.tickets.find((storedTicket) => storedTicket.id === ticket?.id);
            console.log(selectedTicket)
            selectedTicket ? setTicket(selectedTicket) : console.error("Ticket not found");
            selectedTicket ? setDescription(selectedTicket.description) : setDescription("");
            // why is this block necessary? there is no way a ticket may appear on the main and not be stored. However,
            // what happens if we reload the page? 
        }
    }, [data]);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        if (ticket) {
            setTicket({
                ...ticket,
                description: description
            })
        }

    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const targetIndex = data?.findIndex((group) => group.groupName === groupName);
        if (targetIndex !== -1 && data && targetIndex !== undefined) {
            const updatedObject = { ...data[targetIndex] };
            if (ticket) {
                const targetTicketIndex = updatedObject.tickets?.findIndex((targetTicket) => targetTicket.id === ticket.id);
                if (targetIndex !== -1 && data && targetIndex !== undefined) {
                    const updatedTickets = [
                        ...updatedObject.tickets.slice(0, targetTicketIndex),
                        ticket,
                        ...updatedObject.tickets.slice(targetTicketIndex + 1),
                    ];
                    updatedObject.tickets = updatedTickets;
                }
            }
            const updatedData = [
                ...data.slice(0, targetIndex),
                updatedObject,
                ...data.slice(targetIndex + 1),
            ];
            updateData(updatedData);
        }

    };

    return (
        <form className={style.category} onSubmit={handleSubmit}>
            <label className={style.title} htmlFor={ticket?.id}>{ticket ? ticket.name : "Ticket not found"}</label>
            <textarea
                className={style.textarea}
                value={description}
                onChange={handleDescriptionChange}
                rows={4}
            ></textarea>
            <Link to={"/"}>
            <button
                className={style.saveAndReturnBtn}
                disabled={description.trim().length === 0}
                type="submit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.53 32.53" width="32.53" height="32.53">
                    <line x1="0" y1="0" x2="32.53" y2="32.53" stroke="#000000" strokeWidth="1" />
                    <line x1="0" y1="32.53" x2="32.53" y2="0" stroke="#000000" strokeWidth="1" />
                </svg>

            </button>
            </Link>    
        </form>

    )
}

export default TaskPage