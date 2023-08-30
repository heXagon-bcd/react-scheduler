import React, {useState, useEffect} from "react";
import Button from "./Button";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
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
  // useEffect(() => {
  //   const url = "/api/days";
  //   axios.get(url)
  //   .then((response) => {
  //     console.log("response", response)
  //     console.log("object values response", Object.values(response.data))
  //     setDays(Object.values(response.data))
  //   })
  // },[]);

  function bookInterview(id, interview) {
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
  
        setState({
          ...state,
          appointments
        });
      }
    });
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    const interviewers = getInterviewersForDay(state, state.day)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  console.log("daily appointments", dailyAppointments)
  console.log("state", state)

    return (
      <main className="layout">
        <section className="sidebar">
          Save the changes
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList days={state.days} day={state.day} onChange={setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          {schedule}
          <Appointment key="last" time="5pm" bookInterview={bookInterview}/>
        </section>
      </main>
    );

 
}
