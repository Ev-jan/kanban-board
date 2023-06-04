import { render, screen } from "@testing-library/react";
import { AppContext } from "../../../App";
import Footer from "../Footer";
import { TicketGroup } from "../../../types";
import { mockData } from "../../../mockup";

test("renders Footer component with correct task counts", () => {

    const data = mockData;
    let selectedActive = 0;
    let selectedFinished = 0;

    data.forEach((tickets, group) => {
      if (group === TicketGroup.Finished) {
        selectedFinished = tickets.length;
      } else {
        selectedActive += tickets.length;
      }})

  render(
    <AppContext.Provider value={{ data, updateData: jest.fn() }}>
      <Footer />
    </AppContext.Provider>
  );

  const activeTasksElement = screen.getByTestId("activeTaskCount");
  const finishedTasksElement = screen.getByTestId("finishedTaskCount");
  expect(activeTasksElement.textContent).toContain(`${selectedActive}`);
  expect(finishedTasksElement.textContent).toContain(`${selectedFinished}`);
});
