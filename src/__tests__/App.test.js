import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import { server } from "../mocks/server";
import { resetQuestions } from "../mocks/handlers";

// Set up mock server
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetQuestions();
});
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));
  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // click form page
  fireEvent.click(screen.getByText("New Question"));

  // fill out form
  fireEvent.change(screen.getByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3/), {
    target: { value: "Test Answer 3" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 4/), {
    target: { value: "Test Answer 4" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });

  // submit form by clicking the button
  fireEvent.click(screen.getByText("Add Question"));

  // Wait for form submission to complete
  await waitFor(() => {
    expect(screen.getByText("View Questions")).toBeInTheDocument();
  });

  // view questions
  fireEvent.click(screen.getByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));

  await screen.findByText(/lorem testum 1/i);
  
  const deleteButtons = await screen.findAllByText(/Delete Question/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(screen.queryByText(/lorem testum 1/i)).not.toBeInTheDocument();
  });
  
  expect(screen.getAllByText(/Delete Question/i)).toHaveLength(1);
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));

  const selects = await screen.findAllByRole("combobox");
  fireEvent.change(selects[0], { target: { value: "2" } });

  await waitFor(() => {
    expect(selects[0].value).toBe("2");
  });
});
