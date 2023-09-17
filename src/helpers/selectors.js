function getDetailsForDay(state, day, key) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay) {
    return [];
  }

  return selectedDay[key].map((id) => state[key][id]);
}

export function getAppointmentsForDay(state, day) {
  return getDetailsForDay(state, day, "appointments");
}

export function getInterviewersForDay(state, day) {
  return getDetailsForDay(state, day, "interviewers");
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
