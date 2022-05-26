import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without crashing", () => {
    render(
      <Form interviewers={interviewers} />
    );
  });


  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  it("validates that the student name is not blank", () => {
    const onSave = jest.fn(); //mock function
    const { getByText } = render(
      <Form onSave={onSave} interviewers={interviewers} />
    );

    fireEvent.click((getByText("Save"))); //attempt to click

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled(); //verify onSave does not execute
  });


  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn(); //mock function
    const { getByText } = render(
      <Form
        onSave={onSave}
        interviewers={interviewers}
        student="Lydia Miller-Jones"
      />
    );

    fireEvent.click((getByText("Save"))); //attempt to click

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled(); //verify onSave does not execute
  });


  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn(); //mock function
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        onSave={onSave}
        interviewers={interviewers}
        interviewer={interviewers[0]}
      />
    );

    fireEvent.click(getByText("Save")); //attmpt to click

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled(); //verify onSave does not execute

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" } //enter student name in form
    });

    fireEvent.click(getByText("Save")); //attempt to click

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1); //verify execution count
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0]); // verify contents of form
  });


  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn(); //mock function
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save")); //attempt to click

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" } //enter student name in form
    });

    fireEvent.click(getByText("Cancel")); //attempt to click

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1); //verify execution count
  });
});