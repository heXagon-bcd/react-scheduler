import React, { Fragment } from "react";
import Header from "../Appointment/Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Error from "./Error";
import Confirm from "./Confirm";

import "../../../src/components/Appointment/style.scss";

export default function Appointment(props) {
  console.log("appointment props", props.interview)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM_DELETE = "CONFIRM_DELETE";
  const CONFIRM_EDIT = "CONFIRM_EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  function cancel(id) {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
    console.log("canceled");
  }

  function edit(id) {
    console.log("edit button clicked");
    transition(EDIT);
  }

  return (
    <article className="appointment" data-testid="appointment">
      {mode === EMPTY && (
        <div>
          <Header time={props.time} />
          <Empty
            onAdd={() => {
              transition(CREATE);
            }}
          />
        </div>
      )}
      {mode === SHOW && (
        <div>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            id={props.id}
            onDelete={() => transition(CONFIRM_DELETE)}
            onEdit={edit}
          />
        </div>
      )}
      {mode === CREATE && (
        <Form onSave={save} onCancel={back} interviewers={props.interviewers} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Canceling" />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
          interviewers={props.interviewers}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={cancel} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={back} />
      )}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Are you sure you want to delete"
          onCancel={back}
          onConfirm={cancel}
        />
      )}

      {mode === CONFIRM_EDIT && (
        <Confirm
          message="Are you sure you want to edit"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
    </article>
  );
}
