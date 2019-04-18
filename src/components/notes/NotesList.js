import "medium-draft/lib/index.css";
import React, { useEffect } from "react";
import { Pane, Button, Menu, Spinner } from "evergreen-ui";
import { createStore, createEvent, createEffect, combine } from "effector";
import { useStore } from "effector-react";
import { Editor, createEditorState } from "medium-draft";
import mediumDraftExporter from "medium-draft/lib/exporter";
import * as api from "../../api";

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

const loadNotes = createEffect().use(() => api.getNotes());
const createNote = createEffect().use(({ id, content }) => {
  return api.createNote(content);
});

const updateNote = createEffect().use(api.updateNote);

$notes.on(createNote.done, (state, { result }) => [result].concat(state));

createNote.watch(x => setNoteLoading(x.id));
createNote.done.watch(x => setNoteFinished(x.params.id));
createNote.fail.watch(x => setNoteFinished(x.params.id));

$notes.on(updateNote.done, (state, { params }) => {
  return state.map(el => (params.id === el.id ? params : el));
});

updateNote.watch(x => setNoteLoading(x.id));
updateNote.done.watch(x => setNoteFinished(x.params.id));
updateNote.fail.watch(x => setNoteFinished(x.params.id));

$notes.on(loadNotes.done, (_, { result }) => result);

const setSelectedNote = createEffect();
const $selectedNoteId = createStore(null).on(setSelectedNote, (_, p) => p);

loadNotes.done.watch(({ result }) => {
  if (result[0] && !$selectedNoteId.getState()) {
    setSelectedNote(result[0].id);
  }
});

// const  combine($notes, $selectedNoteId, (notes, selectedId) => {
//   if (!notes || !selectedId) {
//     return null;
//   }
//   const el = notes.find(note => note.id === selectedId);
//   return el || null;
// });

const getHtml = state => mediumDraftExporter(state.getCurrentContent());

function SideList() {
  const notes = useStore($notes);
  const selected = useStore($selectedNoteId);
  return notes.length ? (
    <Menu>
      {notes.map(el => {
        const selectedProps =
          selected === el.id ? { icon: "edit", color: "selected" } : undefined;
        return (
          <Menu.Item
            key={el.id}
            onSelect={() => setSelectedNote(el.id)}
            {...selectedProps}
          >
            {el.content}
          </Menu.Item>
        );
      })}
    </Menu>
  ) : (
    <Spinner />
  );
}

function EditNote() {
  const notes = useStore($notes);
  const selected = useStore($selectedNoteId);
  const createState = () =>
    createEditorState(notes.find(el => el.id === selected).content);
  const [editorState, _onChange] = React.useState(createState);
  const onChange = React.useCallback(s => _onChange(s), []);
  const editorRef = React.createRef();
  React.useEffect(() => {
    editorRef.current.focus();
  }, []);

  return (
    <Editor
      ref={editorRef}
      editorState={editorState}
      onChange={onChange}
      placeholder="Write your note..."
    />
  );
}

export const NotesList = () => {
  useEffect(() => {
    loadNotes().then(console.log);
  }, []);
  const note = useStore($selectedNoteId);
  return (
    <Pane display="flex">
      <Pane minWidth="200px" background="tint2" borderRadius={3}>
        <SideList />
      </Pane>
      <Pane flex={1}>{note ? <EditNote key={note} /> : null}</Pane>
    </Pane>
  );
};
