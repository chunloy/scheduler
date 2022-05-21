export function getAppointmentsForDay(state, day) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  return Object.values(state.appointments).filter((apt) => (
    filteredObject.appointments.includes(apt.id)
  ));
};

export function getInterviewersForDay(state, day) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  return Object.values(state.interviewers).filter((apt) => (
    filteredObject.interviewers.includes(apt.id)
  ));
};

export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}