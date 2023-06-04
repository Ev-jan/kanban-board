import { ITicket, TicketGroup } from "./types";

export const mockData = new Map<TicketGroup, ITicket[]>([
    [
      TicketGroup.Backlog,
      [
        {
          id: "1235",
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        },
        {
          id: "1245",
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        },
        {
          id: "12346",
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        },
        {
          id: "12347",
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        }
      ]
    ],
    [
      TicketGroup.InProgress,
      [
        {
          id: "67890",
          name: 'Feature development',
          description: 'Implement new features'
        },
        {
          id: "54321",
          name: 'Refactor code',
          description: 'Improve code quality'
        }
      ]
    ],
    [
      TicketGroup.Ready,
      [
        {
          id: "98765",
          name: 'Testing',
          description: 'Perform testing and QA'
        },
        {
          id: "13579",
          name: 'Documentation',
          description: 'Write project documentation'
        },
        {
          id: "24680",
          name: 'Deployment',
          description: 'Deploy to production environment'
        }
      ]
    ],
    [
      TicketGroup.Finished,
      [
        {
          id: "98765",
          name: 'Jesting',
          description: 'Perform testing and QA'
        },
        {
          id: "13579",
          name: 'Refactor',
          description: 'Write project documentation'
        },
        {
          id: "24680",
          name: 'Hire new junior dev',
          description: 'Hire a new junior dev and teach him how to write proper tests for react components'
        }
      ]
    ]
  ])