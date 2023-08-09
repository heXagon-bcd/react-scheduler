import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList (props) {
  console.log("onchange", props.onChange)
  console.log("props.value", props.value)
  const interviewers = props.interviewers.map((interviewer) => {
    console.log("interviewer.id",interviewer.id)
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        onChange={props.onChange}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

//anon call back function that does not pass the id. this will save development time
//review git lens