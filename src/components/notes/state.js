import {
  createEvent,
  createStore,
  createEffect,
  combine,
  forward
} from "effector";
import { from } from "rxjs";
import { debounceTime } from "rxjs/operators";
import * as api from "../../api";
import { createInitialState, getHtml } from "./utils";

export const $notes = createStore({});
export const $notesList = createStore([]);

export const $selectedNoteId = createStore(null);

export const $selectedNote = combine(
  $notes,
  $selectedNoteId,
  (notes, selectedId) => {
    return notes[selectedId] || null;
  }
);

export const loadNotes = createEffect().use(() => api.getNotes());
export const createNote = createEffect().use(() => {
  const noteContent = "";
  return api.createNote(noteContent);
});

export const updateNoteState = createEvent();
const createNoteState = createEvent();

const updateNote = createEffect().use(r => {
  api.updateNote(r);
});

$notes.on(createNote.done, (state, { result }) => ({
  ...state,
  [result.id]: result
}));

$notes.on(loadNotes.done, (_, { result }) => {
  return result.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
});

const _updateNoteStateWithId = updateNoteState.map(e => {
  return { editorState: e, id: $selectedNoteId.getState() };
});

$notes.on(_updateNoteStateWithId, (st, { editorState, id }) => {
  return { ...st, [id]: { ...st[id], editorState } };
});

$notes.on(updateNote.done, (st, { params }) => {
  return { ...st, [params.id]: { ...st[params.id], content: params.content } };
});

from(_updateNoteStateWithId)
  .pipe(debounceTime(500))
  .subscribe(({ id, editorState }) => {
    const content = getHtml(editorState);
    updateNote({ id, content });
  });

$notes.on(createNoteState, (st, id) => {
  const note = st[id];
  if (note.editorState) {
    return st;
  }
  return {
    ...st,
    [id]: { ...st[id], editorState: createInitialState(note.content) }
  };
});

$notesList.on(loadNotes.done, (_, { result }) => {
  return result.map(i => i.id);
});

export const setSelectedNote = createEvent();
$selectedNoteId.on(setSelectedNote, (_, p) => p);

const createdNoteId = createNote.done.map(({ result }) => result.id);

forward({
  from: createdNoteId,
  to: $selectedNoteId
});

forward({
  from: setSelectedNote,
  to: createNoteState
});

loadNotes.done.watch(({ result }) => {
  if (result[0] && !$selectedNoteId.getState()) {
    setSelectedNote(result[0].id);
  }
});
