// <=== Import frameworks ===>
import { useState, useEffect } from "react";
import axios from "axios";

// <=== updateSpots: counts available spots for a given day ===>
const updateSpots = (state, appointments) => {
  const day = state.days.find(day => day.name === state.day); //get selected day object
  const spots = day.appointments.filter(id => !appointments[id].interview).length; //find # of null appointments

  return state.days.map(day => (day.name === state.day ? { ...day, spots } : { ...day }));
};

export default () => {

  //initialize state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //<=== setDay: sets the state for a selected day ===>
  const setDay = (day) => setState({ ...state, day });

  //get data from db on first render
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

  //<=== update Interview: updates db by adding a new interview, or deleting an interview ===>
  const updateInterview = (id, interview = null) => {

    //copy objects before updating
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = updateSpots(state, appointments);

    //update db with new info
    return (interview ?
      axios.put(`api/appointments/${id}`, { interview }) :
      axios.delete(`api/appointments/${id}`))
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      });
  };

  return { state, setDay, updateInterview };
};