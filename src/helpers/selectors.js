export function getAppointmentsForDay(state, day) {
// Find the day in the state.days array
const selectDay = state.days.find(d => d.name === day);

// If the day doesn't exist, return an empty array
if (!selectDay) {
  return [];
}

// Map the day's appointments IDs to their corresponding appointment details in state.appointments
const appointmentsForDay = selectDay.appointments.map(appointmentId => state.appointments[appointmentId]);

return appointmentsForDay;
}