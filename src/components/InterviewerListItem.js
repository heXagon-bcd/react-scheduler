import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export default function InterviewerListItem (props) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  }

  )
  return(
    <li onClick={() => props.setInterviewer(props.name)} className={interviewClass}>
      <img
        className="interviewers__item-image"
        src={interviewer.avatar}
        alt={interviewer.name}
      />
      {interviewer.name}
    </li>
  )
}