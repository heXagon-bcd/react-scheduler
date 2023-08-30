export function getAppointmentsForDay(state, day) {
console.log("state-appointmentfordays",state  )
console.log("state.interviewers", state.interviewers)
// Find the day in the state.days array
const selectDay = state.days.find(d => d.name === day);
console.log("selectDay",selectDay)

// If the day doesn't exist, return an empty array
if (!selectDay) {
  return [];
}

// Map the day's appointments IDs to their corresponding appointment details in state.appointments
const appointmentsForDay = selectDay.appointments.map(appointmentId => state.appointments[appointmentId]);
console.log("appointmentsForDay",appointmentsForDay)

return appointmentsForDay;
}

export function getInterview(state, interview) {
if(!interview) {
  return null;
}

return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}


export function getInterviewersForDay(state, day) {
  console.log("state-Interviewers",state  )
  console.log("state.interviewers", state.interviewers)
  // Find the day in the state.days array
  const selectDay = state.days.find(d => d.name === day);
  console.log("selectDay",selectDay)
  
  // If the day doesn't exist, return an empty array
  if (!selectDay) {
    return [];
  }
  
  // Map the day's appointments IDs to their corresponding appointment details in state.appointments
  const InterviewersForDay = selectDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  console.log("InterviewersForDay",InterviewersForDay)
  
  return InterviewersForDay;
  }