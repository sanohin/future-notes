// @flow
import React from "react";
import { Pane } from "evergreen-ui";
import { createComponent } from "effector-react";
import { $selectedNote } from "./state";
import { loadNotes } from "./workflow";
import { NotesList } from "./NotesList";
import { EditNote } from "./CurrentNote";
import classes from "./styles.css";

const Edit = createComponent($selectedNote, (props, note) => {
  return note ? <EditNote key={note.id} item={note} /> : null;
});

export default function NotesFeature() {
  React.useEffect(() => {
    loadNotes();
  }, []);
  return (
    <div className={classes.appContainer}>
      <Pane minWidth="200px" background="tint2" borderRadius={3}>
        <NotesList />
      </Pane>
      <div className={classes.noteContainer}>
        <Edit />
      </div>
    </div>
  );
}
