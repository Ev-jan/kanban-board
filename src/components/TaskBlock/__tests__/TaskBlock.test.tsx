import React from "react";
import { TicketGroup } from "../../../types";
import { render, screen } from "@testing-library/react";
import TaskBlock from "../TaskBlock";
import { AppContext } from "../../../App";
import { mockData } from "../../../mockup";
import { BrowserRouter } from "react-router-dom";




test("renders the task block and its title, and the title matches the props value", () => {
    render(
        <BrowserRouter>
            <AppContext.Provider
                value={{
                    data: mockData,
                    updateData: jest.fn(),
                }}
            >
                <TaskBlock currentGroupName={TicketGroup.Backlog} />
            </AppContext.Provider>
        </BrowserRouter>
    );

    const taskBlock = screen.getByTestId("task-block");
    const titleElement = screen.getByTestId("task-block-title");

    expect(taskBlock).toBeInTheDocument();
    expect(taskBlock).toBeVisible();
    expect(titleElement.textContent).toMatch(TicketGroup.Backlog);
});

test("renders a list of tickets inside TaskBlock component", () => {
    render(
        <BrowserRouter>
            <AppContext.Provider
                value={{
                    data: mockData,
                    updateData: jest.fn(),
                }}
            >
                <TaskBlock currentGroupName={TicketGroup.Ready} />
            </AppContext.Provider>
        </BrowserRouter>
    );

    const taskBlock = screen.getByTestId("task-block");
    const listElement = screen.getByRole("list");
    const listItemElements = screen.getAllByRole("listitem");

    expect(taskBlock).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
    expect(listItemElements).toHaveLength(
        mockData.get(TicketGroup.Ready)?.length || 0
    );
});