import { useEffect } from "react";
import { ITicket, TicketGroup } from "./types";
import { v4 as uuidv4 } from "uuid";

export function getPrevGroupName(
  currentGroupName: TicketGroup
): TicketGroup | null {
  switch (currentGroupName) {
    case TicketGroup.Backlog:
      return null;
    case TicketGroup.Ready:
      return TicketGroup.Backlog;
    case TicketGroup.InProgress:
      return TicketGroup.Ready;
    case TicketGroup.Finished:
      return TicketGroup.InProgress;
    default:
      return null;
  }
}

export const useTicketProcessing = (
  inputValue: string,
  currentGroupName: TicketGroup,
  prevGroupName: TicketGroup | null,
  data: Map<TicketGroup, ITicket[]>,
  updateData: (newData: Map<TicketGroup, ITicket[]>) => void
) => {
  useEffect(() => {
    if (inputValue.trim() === "") {
      return;
    }
    const storedCurrentGroup = data.get(currentGroupName);
    const storedPrevGroup = prevGroupName ? data.get(prevGroupName) : null;
    if (storedCurrentGroup) {
      const existingTicket = storedCurrentGroup.find(
        (ticket) => ticket.name.toLowerCase() === inputValue.toLowerCase()
      );

      // do nothing unless the ticket with the name === input value exists in the current group

      if (existingTicket) {
        return;
      }

      // check if it also exists in the previous group

      if (storedPrevGroup && prevGroupName) {
        const existingTicket = storedPrevGroup.find(
          (ticket) => ticket.name.toLowerCase() === inputValue.toLowerCase()
        );
        if (existingTicket) {
          const updatedPrevGroup = storedPrevGroup.filter(
            (ticket) => ticket.name !== existingTicket.name
          );
          const updatedCurrentGroup = [...storedCurrentGroup, existingTicket];
          const updatedData = new Map(data);
          updatedData.set(currentGroupName, updatedCurrentGroup);
          updatedData.set(prevGroupName, updatedPrevGroup);
          updateData(updatedData);
        }

        // after we've checked that the ticket is neither in the current group nor in the previous, we go ahead and create a new one and put it in the current group
      } else {
        const newTicket = {
          id: uuidv4(),
          name: inputValue,
          description: "",
        };

        const updatedGroup = [...storedCurrentGroup, newTicket];
        const updatedData = new Map(data);

        updatedData.set(currentGroupName, updatedGroup);
        updateData(updatedData);
      }
    }
  }, [inputValue]);
};

export const useCloseOnClickOutside = (
  outerRef: React.RefObject<HTMLElement>,
  refClassName: string,
  handleClearSelection?: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as Element;
      console.log(outerRef)
      const isClickInsideDropdown =
        targetElement?.closest(refClassName) !== null;

      if (
        outerRef.current &&
        !outerRef.current.contains(event.target as Node) &&
        !isClickInsideDropdown
      ) {
        if (handleClearSelection) {
          handleClearSelection();
        } else return;
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [outerRef]);
};
