import React from "react";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default () => {

  const { state, setDay, updateInterview } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  // const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={getInterviewersForDay(state, state.day)}
        interview={getInterview(state, appointment.interview)}
        updateInterview={updateInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
