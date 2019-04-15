import React, { useState, useEffect } from "react";
import { Pane, Textarea, Button } from "evergreen-ui";
import { createStore, createEvent, createEffect } from "effector";
import { Editor, EditorState, RichUtils } from "draft-js";
import { useStore } from "effector-react";
import { getNotes, updateNote, createNote } from "../../api";

const $loadingNotes = createStore({});
const setNoteLoading = createEvent();
const setNoteFinished = createEvent();

$loadingNotes
  .on(setNoteLoading, (state, payload) => ({
    ...state,
    [payload]: true
  }))
  .on(setNoteFinished, (state, payload) => ({
    ...state,
    [payload]: false
  }));

const $notes = createStore([]);
const loadNotes = createEffect().use(() => getNotes());
const addNote = createEffect().use(({ id, content }) => {
  return createNote(content);
});

const changeNote = createEffect().use(updateNote);

$notes.on(addNote.done, (state, { result }) => [result].concat(state));

addNote.watch(x => setNoteLoading(x.id));
addNote.done.watch(x => setNoteFinished(x.params.id));
addNote.fail.watch(x => setNoteFinished(x.params.id));

$notes.on(changeNote.done, (state, { params }) => {
  return state.map(el => (params.id === el.id ? params : el));
});

changeNote.watch(x => setNoteLoading(x.id));
changeNote.done.watch(x => setNoteFinished(x.params.id));
changeNote.fail.watch(x => setNoteFinished(x.params.id));

$notes.on(loadNotes.done, (_, { result }) => result);

const Note1 = ({ value, id, save, loading }) => {
  const [localText, changeText] = useState(value);
  const hasDiff = value !== localText;
  const onSave = e => {
    e.preventDefault();
    save({ id, content: localText });
  };
  return (
    <Pane marginTop={24} display="flex">
      <form style={{ display: "contents" }} onSubmit={onSave}>
        <Textarea
          value={localText}
          placeholder="Enter text here"
          onChange={e => changeText(e.target.value)}
        />
        <Pane width={100}>
          {hasDiff && (
            <Button isLoading={loading} type="submit" marginLeft={8}>
              Save
            </Button>
          )}
        </Pane>
      </form>
    </Pane>
  );
};

function Note() {
  const [editorState, changeState] = React.useState(EditorState.createEmpty);
  const underline = () => {
    changeState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };
  return (
    <>
      <button type="button" onClick={underline}>
        _
      </button>
      <Editor editorState={editorState} onChange={changeState} />
    </>
  );
}

const newNoteId = "new";
export const NotesList = () => {
  const notes = useStore($notes);
  const loading = useStore($loadingNotes);

  useEffect(() => {
    loadNotes().then(console.log);
  }, []);
  return (
    <Pane padding={24}>
      <Note />
      <Note1
        value=""
        id={newNoteId}
        save={addNote}
        loading={loading[newNoteId]}
      />
      {notes.map(note => (
        <Note1
          key={note.id}
          id={note.id}
          loading={loading[note.id]}
          value={note.content}
          save={changeNote}
        />
      ))}
    </Pane>
  );
};
