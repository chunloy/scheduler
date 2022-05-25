import React from "react";

import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const SHOW = "SHOW";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default (props) => {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    transition(SAVING);

    props.updateInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING, true);

    props.updateInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === ERROR_SAVE &&
        <Error
          message="Could not save appointment"
          onClose={back}
        />
      }

      {mode === ERROR_DELETE &&
        <Error
          message="Could not delete appointment"
          onClose={back}
        />
      }

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
};