import React, { Fragment } from "react";
import Header from "../Appointment/Header";
import Empty from "./Empty";
import Show from "./Show";

import "../../../src/components/Appointment/style.scss";

export default function Appointment(props) {
    return props.interview ? (
      <article className="appointment">
        <Header time={props.time} />
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        // onEdit={}
        // onDelete={}
        />
      </article>
    ) : (
      <article className="appointment">
        <Header time={props.time} />
        <Empty />
      </article>
    );
}


