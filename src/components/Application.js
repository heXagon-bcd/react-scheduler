import React, {useState, useEffect} from "react";
import Button from "./Button";
import DayList from "./DayList";
import DayListItem from "./DayListItem";
import Appointment from "./Appointment";
import axios from "axios";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const dailyAppointments = [];
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState({ ...state, days });

  // const days = [];
  useEffect(() => {
    const url = "/api/days";
    axios.get(url)
    .then((response) => {
      console.log("response", response)
      console.log("object values response", Object.values(response.data))
      setDays(Object.values(response.data))
    })
  },[]);

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
        {dailyAppointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
