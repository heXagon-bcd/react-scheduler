import React, { Fragment } from "react";
import Header from "../Appointment/Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

import "../../../src/components/Appointment/style.scss";

export default function Appointment(props) {
  console.log("index.js appt props +++++",props)
  // console.log("props.interview.studetnt",props.interview.student)
  // console.log("props.interview.interviewer", props.interview.interviewer)

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
  .then(() => {
    transition(SHOW);
  })
  .catch(error => {
    // Handle the error here
  });
  }
  function cancel(id) {
    const interview = null
    transition(DELETING)

    props.cancelInterview(props.id)
    .then (() => transition(EMPTY))
    console.log("canceled")
  }

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd") 
      transition(CREATE)} } />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={cancel}
        />
      )}
      {mode === CREATE && (
        <Form
         onSave={save}
         interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Canceling"/>
      )}
    </article>
  );
}
