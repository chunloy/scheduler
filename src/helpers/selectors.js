export function getAppointmentsForDay(state, day) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  const filteredApts = Object.values(state.appointments).filter((apt) => (
    filteredObject.appointments.includes(apt.id)
  ));

  return filteredApts;
};

export function getInterview(state, interview) {
  if (!interview) return null;
  const result = { student: interview.student, interviewer: state.interviewers[interview.interviewer] };

  return result;
}
