import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


 function Form (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");


  const reset = function () {
    setStudent("");
    setInterviewer(null);
  }

  function validate() {
    setError("");
    console.log("Validating...");  // Debug line
  
    if (student === "") {
      console.log("Student name is blank. Setting error...");  // Debug line
      setError("Student name cannot be blank");
      return;
    }
  
    if (interviewer === null) {
      console.log("Interviewer is null. Setting error...");  // Debug line
      setError("Please select an interviewer");
      return;
    }
  
    // If it reached this point, no errors were found
    console.log("No errors found. Calling onSave...");  // Debug line
    props.onSave(student, interviewer);
  }
  
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
        data-testid="student-name-input"
      />
    </form> 
    <section className="appointment__validation">{error}</section>
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
      // onClick={() => props.onSave(student, interviewer)}
      onClick={validate}
       >Save</Button>
    </section>
  </section>
</main>
  )
}


export default Form