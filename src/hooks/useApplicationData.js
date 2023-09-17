import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(intial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => setState({ ...state, days });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(appointments) {
    const result = state.days.map((day) => {
      let count = 0;
      for (let appointmentID of day.appointments) {
        if (!appointments[appointmentID].interview) {
          count++;
        }
      }
      return { ...day, spots: count };
    });
    return result;
  }

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((response) => {
        if (response.status === 204) {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
          setState({
            ...state,
            appointments,
            days: updateSpots(appointments),
          });
        }
      });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      if (response.status === 204) {
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment, //square brackets id is variable and reads the value instead of the word id
        };
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments),
        });
      }
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
  };
}
