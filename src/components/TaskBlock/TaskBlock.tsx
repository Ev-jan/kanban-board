import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { ITicket, TicketGroup } from "../../types";
import style from "./style.module.css";
import Input from "../Input/Input";
import Ticket from "../Ticket/Ticket";
import { getPrevGroupName } from "../../utils";
import { useTicketProcessing } from "../../utils";

type TaskBlockProps = {
  currentGroupName: TicketGroup;
};

const TaskBlock: React.FC<TaskBlockProps> = ({ currentGroupName }) => {
  const prevGroupName: TicketGroup | null = (getPrevGroupName(currentGroupName));
  const { data, updateData } = useContext(AppContext);
  const [currentGroup, setCurrentGroup] = useState<ITicket[] | undefined>(undefined);
  const [prevGroup, setPrevGroup] = useState<ITicket[] | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (data) {
      const selectedGroup = data.get(currentGroupName);
      setCurrentGroup(selectedGroup);
    } else {
      console.error("Current group not found in storage")
      setCurrentGroup([]);
    }
  }, [data, currentGroupName]);


  useEffect(() => {
    if (data && prevGroupName)
      setPrevGroup(data.get(prevGroupName));
  }, [data, prevGroupName, currentGroupName]);

  useTicketProcessing(inputValue, currentGroupName, prevGroupName, data, updateData);

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <section className={style.ticketGroup} data-testid="task-block">
      <h2 className={style.title} data-testid="task-block-title">{currentGroupName}</h2>
      <ul className={style.ticketList}>
        {currentGroup &&
          currentGroup.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} groupName={currentGroupName} />
          ))}
      </ul>
      <Input groupName={currentGroupName} onInputChange={handleInputValueChange} selectOptions={prevGroup} />
    </section>
  );
};

export default TaskBlock;
