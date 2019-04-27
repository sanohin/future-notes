// @flow
import { forward, createEffect, createEvent } from "effector";
import { from } from "rxjs";
import { debounceTime } from "rxjs/operators";
import * as api from "../../api";
import { createInitialState, getHtml, getPreviewText } from "./utils";
import {
  $notes,
  $notesList,
  $selectedNote,
  $selectedNoteId,
  $editorState
} from "./state";
import type { Note } from "../../types";

export const loadNotes = createEffect<void, Array<Note>, any>();
export const createNote = createEffect<void, Note, any>();
export const deleteNote = createEffect<string, void, any>();
const updateNote = createEffect<
  { id: string, content: string, editorState: any },
  void,
  any
>();

export const setSelectedNote = createEvent<string>();
export const updateNoteState = createEvent<any>();
const createNoteState = createEvent<string | null>();

loadNotes.use(() => api.getNotes());
createNote.use(() => api.createNote(""));
deleteNote.use(id => api.removeNote(id));
updateNote.use(r => api.updateNote(r));

// helper action to save the note
const _updateNoteStateWithId = updateNoteState.map(editorState => {
  const currentId = $selectedNoteId.getState();
  if (!currentId) {
    throw new Error("$selectedNoteId is null during update.");
  }
  return { editorState, id: currentId };
});

const createdNoteId = createNote.done.map(({ result }) => result.id);

$notes.on(createNote.done, (state, { result }) => ({
  ...state,
  [result.id]: result
}));

$notes.on(loadNotes.done, (_, { result }) => {
  return result.reduce((acc, cur) => {
    acc[cur.id] = {
      ...cur,
      preview: getPreviewText(createInitialState(cur.content))
    };
    return acc;
  }, {});
});

forward({
  from: updateNoteState,
  to: $editorState
});

$editorState.on(createNoteState, (st, id) => {
  if (!id) {
    return st;
  }
  const note = $notes.getState()[id];
  return createInitialState(note.content);
});

$notes.on(updateNote.done, (st, { params }) => {
  const preview = getPreviewText(params.editorState);
  return {
    ...st,
    [params.id]: { ...st[params.id], content: params.content, preview }
  };
});

from(_updateNoteStateWithId)
  .pipe(debounceTime(500))
  .subscribe(({ id, editorState }) => {
    const content = getHtml(editorState);
    updateNote({ id, content, editorState });
  });

$notes.on(deleteNote.done, (st, { params }) => {
  const { [params]: deletedItem, ...rest } = st;
  return rest;
});

$notesList.on(loadNotes.done, (_, { result }) => {
  return result.map(i => i.id);
});

$selectedNoteId.on(setSelectedNote, (_, p) => p);

$selectedNoteId.on($notesList, (item, list) => {
  if (list.includes(item)) {
    return item;
  }
  return list[0] || null;
});

forward({
  from: createdNoteId,
  to: setSelectedNote
});

$notesList.on(createdNoteId, (s, id) => [id].concat(s));

$notesList.on(deleteNote.done, (s, { params }) =>
  s.filter(el => el !== params)
);

forward({
  from: $selectedNoteId,
  to: createNoteState
});

loadNotes.done.watch(({ result }) => {
  if (!result[0]) {
    createNote();
  }
});

const subscription = $notesList.watch(r => {
  if (subscription && !r.length) {
    createNote();
  }
});
