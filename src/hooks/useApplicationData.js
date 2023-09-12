import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(intial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState({ ...state, days });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>{
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log("all states",all[0].data,all[1].data,all[2].data)
      console.log(all[0].data)
    })
  },[])

  function updateSpots(appointments) {
    // console.log("updateSpots arguments", appointments)
    // let count = 0;
    // for(let apptID in appointmentNumber) {
    //   const interviewID = appointmentNumber[apptID]
    //   console.log("apptID", interviewID)
    //   if(appointments[interviewID].id) {
    //     console.log("null", appointments[interviewID].interview)
    //     if(appointments[interviewID].interview === null) {
    //       count++
    //     }
    //   }
    // }
    // console.log("useAppData appointments",count);
    //   // console.log("updatespots array",appointmentNumber[appts])

    //return array days
    const result = state.days.map((day) => {
      let count = 0;
      console.log("day",day)
      for(let appointmentID of day.appointments) {
        console.log("appointments[appointmentID]",appointments[appointmentID])
        if(!appointments[appointmentID].interview) {
          count++
        }
      }
      return {...day, spots: count}
    })
    return result
  }
  

  function bookInterview(id, interview) {
    console.log("bookinterview", id, interview)
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(response => {
      if (response.status === 204) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
  
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        console.log("book interview appointments",appointments)
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments)
        })
      }
    });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      if (response.status === 204) {
        const appointment = {
          ...state.appointments[id],
          interview : null
        }
        console.log("cancelInterview appointment", appointment)
        const appointments = {
          ...state.appointments,
          [id]: appointment//square brackets id is variable and reads the value instead of the word id
        }
        console.log("cancelInterview appointments", appointments)
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments)
        });
      }
    })

  }
  return {
    state, // <-- Add this
    setDay, // <-- Add this
    bookInterview, // <-- Add this
    cancelInterview, // <-- Add this
    updateSpots
  };
}