export function getAppointmentsForDay(state, day) {
  const filteredObject = state.days.find(obj => obj.name === day);
  if (!filteredObject) return [];

  const filteredApts = Object.values(state.appointments).filter((apt) => (
    filteredObject.appointments.includes(apt.id)
  ));

  return filteredApts;
};