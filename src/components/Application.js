import React, {useState, useEffect} from "react";
import Button from "./Button";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview, 
    updateSpots
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    const interviewers = getInterviewersForDay(state, state.day)
   
   return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          appointments={state.appointments}
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
            <DayList days={state.days} day={state.day} onChange={setDay} appointments={state.appointments} />
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
