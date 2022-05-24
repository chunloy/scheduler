import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days: countSpots(appointments, id) });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: countSpots(appointments, id) });
      });
  }

  const countSpots = (appointments, id) => {
    const dayIndex = state.days.findIndex(day => day.name === state.day);

    const appointmentsArray = [...state.days[dayIndex].appointments];
    if (id && !appointmentsArray.includes(id)) appointmentsArray.push(id);

    let remainingSpots = appointmentsArray.length;

    appointmentsArray.forEach(id => {
      if (appointments[id].interview) remainingSpots--;
    });

    const day = {
      ...state.days[dayIndex],
      spots: remainingSpots
    };

    const days = [...state.days];
    days[dayIndex] = day;

    return days;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch(error => console.error(error));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}