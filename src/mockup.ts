import { ITicketGroup } from "./types";

const dataMock = [
    {
      groupName: 'Backlog',
      tickets: [
        {
          id: 1235,
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        },
        {
          id: 1245,
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        },
        {
          id: 12346,
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        },
        {
          id: 12347,
          name: 'Sprint bugfix',
          description: 'Fix all the bugs'
        }
      ]
    },
    {
      groupName: 'In progress',
      tickets: [
        {
          id: 67890,
          name: 'Feature development',
          description: 'Implement new features'
        },
        {
          id: 54321,
          name: 'Refactor code',
          description: 'Improve code quality'
        }
      ]
    },
    {
      groupName: 'Finished',
      tickets: [
        {
          id: 98765,
          name: 'Testing',
          description: 'Perform testing and QA'
        },
        {
          id: 13579,
          name: 'Documentation',
          description: 'Write project documentation'
        },
        {
          id: 24680,
          name: 'Deployment',
          description: 'Deploy to production environment'
        }
      ]
    },
    {
      groupName: 'Ready',
      tickets: [
        {
          id: 98765,
          name: 'Jesting',
          description: 'Perform testing and QA'
        },
        {
          id: 13579,
          name: 'Refactor',
          description: 'Write project documentation'
        },
        {
          id: 24680,
          name: 'Hire new junior dev',
          description: 'Deploy to production environment'
        }
      ]
    }
  ];
  