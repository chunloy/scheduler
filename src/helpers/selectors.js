export function getDataForDay(state, day, apt) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  return (apt ?
    filteredObject.appointments.map(id => state.appointments[id]) :
    filteredObject.interviewers.map(id => state.interviewers[id])
  );
};

export function getInterview(state, interview) {
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}