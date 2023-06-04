import { render, fireEvent, screen } from "@testing-library/react";
import Input from "./../Input";
import { TicketGroup } from "../../../types";
import React from "react";

const selectOptions = [
  { name: "Option 1", id: "654918+49824", description: "description" },
  { name: "Option 2", id: "268744298427", description: "descriptio1" },
  { name: "Option 3", id: "654917s49824", description: "descriptio2" },
  { name: "Option 4", id: "654918qw9825", description: "descriptio3" },

];

test("renders the input element when groupName is Backlog and isInputHidden is false", () => {
  jest.spyOn(React, "useState").mockReturnValue(["", jest.fn()]);

  render(<Input groupName={TicketGroup.Backlog} onInputChange={() => { }} selectOptions={[]} />);
  const inputElement = screen.getByTestId("input-field");

  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeVisible();
});

test("renders the select element when groupName is not Backlog, isInputHidden is false, and when select options array is not empty", () => {
  jest.spyOn(React, "useState").mockReturnValue(["", jest.fn()]);


  render(<Input groupName={TicketGroup.Ready} onInputChange={() => { }} selectOptions={selectOptions} />);
  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();
  expect(selectElement).toBeVisible();
});


test("invokes handleInputChange correctly whilst displaying text input", () => {
  const mockHandleInputChange = jest.fn();
  jest.spyOn(React, "useState").mockReturnValue(["some user value", jest.fn()]);

  render(<Input groupName={TicketGroup.Backlog} onInputChange={mockHandleInputChange} selectOptions={[]} />);

  const button = screen.getByText("Submit");
  expect(button).toBeVisible();
  fireEvent.click(button);
  expect(mockHandleInputChange).toHaveBeenCalled();
});

test("invokes handleInputChange correctly whilst displaying select", () => {
  const mockHandleInputChange = jest.fn();
  jest.spyOn(React, "useState").mockReturnValue(["some user value", jest.fn()]);

  render(<Input groupName={TicketGroup.Ready} onInputChange={mockHandleInputChange} selectOptions={selectOptions} />);

  const button = screen.getByText("Submit");
  expect(button).toBeVisible();
  fireEvent.click(button);
  expect(mockHandleInputChange).toHaveBeenCalled();
});

test("does not invoke handleInputChange whilst displaying a text input & input value is an empty string", () => {
  const mockHandleInputChange = jest.fn();
  jest.spyOn(React, "useState").mockReturnValue(["", jest.fn()]);

  render(<Input groupName={TicketGroup.Backlog} onInputChange={mockHandleInputChange} selectOptions={[]} />);

  const button = screen.getByText("Add card");
  expect(button).toBeVisible();
  fireEvent.click(button);
  expect(mockHandleInputChange).not.toHaveBeenCalled();
});
