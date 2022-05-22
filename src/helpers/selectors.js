export function getAppointmentsForDay(state, day) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  return filteredObject.appointments.map(id => state.appointments[id]);
};

export function getInterviewersForDay(state, day) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  return filteredObject.interviewers.map(id => state.interviewers[id]);
};

export function getInterview(state, interview) {
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}