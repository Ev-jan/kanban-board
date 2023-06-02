import { useContext, useEffect, useState } from "react";
import { ITicket, TicketGroup } from "../../types";
import style from "./style.module.css";
import { AppContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const TaskPage: React.FC = () => {
  const { data, updateData } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const payLoadTicket = location.state.ticket as ITicket;
  const groupName = location.state.groupName as TicketGroup;
  const [ticket, setTicket] = useState<ITicket | undefined>(undefined);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getStoredTicket = async () => {
      try {
        if (data) {
          const selectedTicket = data.get(groupName)?.find((storedTicket) => storedTicket.id === payLoadTicket?.id);
          if (selectedTicket) {
            setTicket(selectedTicket);
            setDescription(selectedTicket.description.trim().length !== 0 ? selectedTicket.description : "This task has no description yet");
          }
        }
      } catch {
        console.error("Ticket not found");
      }
    };
    getStoredTicket();
  }, [data, groupName]);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    if (ticket) {
      setTicket((prevTicket) => {
        if (prevTicket) {
          return {
            ...prevTicket,
            description: event.target.value
          };
        }
        return prevTicket;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data && ticket) {
      const targetGroup = data.get(groupName);
      if (targetGroup) {
        const updatedTickets = targetGroup.map((storedTicket) => {
          if (storedTicket.id === ticket.id) {
            return ticket;
          }
          return storedTicket;
        });
        data.set(groupName, updatedTickets);
        updateData(new Map(data));
      }
    }
    navigate("/");
  };

  return (
    <form className={style.taskEditForm} onSubmit={handleSubmit}>
      <label className={style.title} htmlFor={ticket?.id}>{ticket ? ticket.name : "Ticket not found"}</label>
      <textarea
        className={style.textarea}
        value={description}
        onChange={handleDescriptionChange}
        rows={4}
      ></textarea>
      <button
        className={style.saveAndReturnBtn}
        type="submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.53 32.53" width="32.53" height="32.53">
          <line x1="0" y1="0" x2="32.53" y2="32.53" stroke="#000000" strokeWidth="1" />
          <line x1="0" y1="32.53" x2="32.53" y2="0" stroke="#000000" strokeWidth="1" />
        </svg>
      </button>
    </form>
  );
};

export default TaskPage;
