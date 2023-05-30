import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { ITicket, ITicketGroup } from "../../types"
import style from "./style.module.css"
import Input from "../Input/Input";
import Ticket from "../Ticket/Ticket";
import { v4 as uuidv4 } from 'uuid';

type TaskBlockProps = {
  groupName: "Backlog" | "Ready" | "In Progress" | "Finished";
}

const TaskBlock: React.FC<TaskBlockProps> = (props) => {
  const currentGroupName = props.groupName;
  const [prevGroupName, setPrevGroupName] = useState<"Backlog" | "Ready" | "In Progress">("Backlog");
  const [currentGroup, setCurrentGroup] = useState<ITicketGroup | undefined>(undefined);
  const [prevGroup, setPrevGroup] = useState<ITicketGroup | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>("");
  const { data, updateData } = useContext(AppContext);

  useEffect(() => {
    if (data) {
      const selectedGroup = data.find((selected) => selected.groupName.toLowerCase() === currentGroupName.toLowerCase());
      setCurrentGroup(selectedGroup);
    } else {
      setCurrentGroup({
        groupName: currentGroupName,
        tickets: []
      });
    }

  }, [data, currentGroupName]);


  useEffect(() => {
    switch (currentGroupName) {
      case "Backlog":
        break;
      case "Ready":
        setPrevGroupName("Backlog");
        break;
      case "In Progress":
        setPrevGroupName("Ready");
        break;
      case "Finished":
        setPrevGroupName("In Progress");
        break;
    }
    prevGroupName && data &&
      setPrevGroup(data.find((selected) => selected.groupName.toLowerCase() === prevGroupName.toLowerCase()));
  }, [currentGroupName, data, prevGroupName]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      return
    } else {
      const newTicket: ITicket = {
        id: uuidv4(),
        name: inputValue,
        description: "",
      };

      const targetIndex = data?.findIndex((group) => group.groupName === currentGroupName);
      if (targetIndex !== -1 && data && targetIndex !== undefined) {
        const updatedObject = { ...data[targetIndex] };
        updatedObject.tickets = [...updatedObject.tickets, newTicket];
        const updatedData = [
          ...data.slice(0, targetIndex),
          updatedObject,
          ...data.slice(targetIndex + 1),
        ];
        const prevGroupIndex = data?.findIndex((group) => group.groupName === prevGroupName);
        if (prevGroupIndex !== -1 && data && prevGroupIndex !== undefined && currentGroupName !== "Backlog") {
          const prevGroup = { ...data[prevGroupIndex] };
          prevGroup.tickets = prevGroup.tickets.filter((ticket) => ticket.name !== inputValue);

          updatedData[prevGroupIndex] = prevGroup;
        }
        updateData(updatedData);
      }
    }
  }, [inputValue])

  // delete tickets from the previous group when moved to the current group

  useEffect(() => {
    if (currentGroup && prevGroup) {
      const ticketName = inputValue;

      const ticketExistsInCurrentGroup = currentGroup.tickets.some((ticket) => ticket.name === ticketName);
      const ticketExistsInPrevGroup = prevGroup.tickets.some((ticket) => ticket.name === ticketName);

      if (ticketExistsInCurrentGroup && ticketExistsInPrevGroup) {
        const updatedPrevTickets = prevGroup.tickets.filter((ticket) => ticket.name !== ticketName);
        setPrevGroup({
          ...prevGroup,
          groupName: prevGroupName,
          tickets: updatedPrevTickets

        })
      }
    }
  }, [inputValue, currentGroup, prevGroup, prevGroupName])


  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <section className={style.category}>
      <h2 className={style.title}>{currentGroupName}</h2>
      <ul>
        {currentGroup &&
          currentGroup.tickets.map((ticket) => (
            <Ticket
            key={ticket.id}
            ticket={ticket}
            groupName={currentGroupName}
            />
          ))}
      </ul>
      <Input
        groupName={currentGroupName}
        onInputChange={handleInputValueChange}
        selectOptions={prevGroup} />
    </section>
  );
};

export default TaskBlock;