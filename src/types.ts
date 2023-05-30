export interface ITicketGroup {
  groupName: "Backlog" | "Ready" | "In Progress" | "Finished";
  tickets: ITicket[];
}

export interface ITicket {
  id: string;
  name: string;
  description: string;
}

