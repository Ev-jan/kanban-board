export interface ITicket {
  id: string;
  name: string;
  description: string;
}

export enum TicketGroup {
  Backlog = "Backlog",
  Ready = "Ready",
  InProgress = "In Progress",
  Finished = "Finished",
}

