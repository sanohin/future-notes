// @flow
import React from "react";
import { createComponent } from "effector-react";
import { $selectedNote } from "./state";
import { loadNotes } from "./workflow";
import { NotesList } from "./NotesList";
import { EditNote } from "./CurrentNote";
import { AppContainer, NoteContainer, ListContainer } from "./styled";

const Edit = createComponent($selectedNote, (props, note) => {
  return note ? <EditNote key={note.id} item={note} /> : null;
});

export default function NotesFeature() {
  React.useEffect(() => {
    loadNotes();
  }, []);
  return (
    <AppContainer>
      <ListContainer>
        <NotesList />
      </ListContainer>
      <NoteContainer>
        <Edit />
      </NoteContainer>
    </AppContainer>
  );
}
