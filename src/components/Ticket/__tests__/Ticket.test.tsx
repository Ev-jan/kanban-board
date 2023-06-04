import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Ticket from "../Ticket";
import { TicketGroup } from "../../../types";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

describe("Ticket component", () => {
    const mockTicket = {
        id: "123",
        name: "Ticket 1",
        description: "random stuff in random order"
    };
    const mockGroupName = TicketGroup.InProgress;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("renders ticket name correctly", () => {
        render(
            <BrowserRouter>
                <Ticket ticket={mockTicket} groupName={mockGroupName} />
            </BrowserRouter>
        );
        const ticketElement = screen.getByText(mockTicket.name);
        expect(ticketElement).toBeInTheDocument();
    });

    it("navigates to ticket details when clicked", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockImplementation(() => navigate);
        render(
            <BrowserRouter>
                <Ticket ticket={mockTicket} groupName={mockGroupName} />
            </BrowserRouter>
        );

        const ticketElement = screen.getByText(mockTicket.name);
        expect(ticketElement).toBeInTheDocument()
        fireEvent.click(ticketElement);

        expect(navigate).toHaveBeenCalledWith(
            expect.stringContaining(`/${mockGroupName}/${mockTicket.id}`),
            expect.objectContaining({
              state: {
                ticket: expect.objectContaining({
                  id: mockTicket.id,
                  name: mockTicket.name,
                  description: mockTicket.description,
                }),
                groupName: mockGroupName,
              },
            })
          );;
    });
});
