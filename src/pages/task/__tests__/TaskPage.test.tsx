import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../../../App";
import { TicketGroup } from "../../../types";
import TaskPage from "../TaskPage";


test("renders ticket description or default phrase and invokes handleSubmit correctly", async () => {
    const ticket = {
        id: "123",
        name: "Ticket 1",
        description: "",
    };

    const data = new Map();
    data.set(TicketGroup.InProgress, [ticket]);

    const updateData = jest.fn();

    render(
        <MemoryRouter initialEntries={[{ state: { ticket, groupName: TicketGroup.InProgress }, pathname: "/task" }]}>
            <AppContext.Provider value={{ data, updateData }}>
                <Routes>
                    <Route path="/task" element={<TaskPage />} />
                </Routes>
            </AppContext.Provider>
        </MemoryRouter>
    );

    const descriptionTextarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button");


    await waitFor(() => {
        const descriptionTextarea = screen.getByRole("textbox") as HTMLTextAreaElement;
        expect(descriptionTextarea.value).toBe("This task has no description yet");
    });

    fireEvent.change(descriptionTextarea, { target: { value: "New description" } });
    expect(descriptionTextarea.value).toBe("New description");

    fireEvent.click(submitButton);

    expect(updateData).toHaveBeenCalledTimes(1);
});
