import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => console.error(error));
  }

  function deleteInterview() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => console.error(error));
  }

  console.log(props.interview);
  console.log(props.student);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      }

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }

      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      }

      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      }

    </article>
  );
}