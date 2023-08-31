import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = function () {
    setStudent("");
    setInterviewer(null);
  }
  const cancelButtonClick = function () {
    reset();
    props.onCancel();//jsx vs js syntax
  }

console.log("props interviewr.",props.interviewers)
console.log("props Form.js.",props)
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"
    onSubmit={event => event.preventDefault()}
    >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={event => setStudent(event.target.value)}
        value={student}
      />
    </form> 
    <InterviewerList 
      interviewers={props.interviewers}
      onChange={id => setInterviewer(id)}//id is arbitrar>?
      onCancel={reset}
      value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger//css built into react for danger
      onClick={() => props.onCancel()}
      >Cancel</Button>
      <Button confirm
      onClick={() => props.onSave(student, interviewer)}
       >Save</Button>
    </section>
  </section>
</main>
  )
}