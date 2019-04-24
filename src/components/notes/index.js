// @flow
import React from "react";
import { Pane } from "evergreen-ui";
import { useStore } from "effector-react";
import { $selectedNoteId } from "./state";
import { loadNotes } from "./state";
import { NotesList } from "./NotesList";
import { EditNote } from "./CurrentNote";
import classes from "./styles.css";

export default function NotesFeature() {
  React.useEffect(() => {
    loadNotes();
  }, []);
  const noteId = useStore($selectedNoteId);
  return (
    <div className={classes.appContainer}>
      <Pane minWidth="200px" background="tint2" borderRadius={3}>
        <NotesList />
      </Pane>
      <div className={classes.noteContainer}>
        {noteId ? <EditNote key={noteId} /> : null}
      </div>
    </div>
  );
}
