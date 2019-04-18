import { createEvent, createStore, createEffect, combine } from "effector";
import * as api from "../../api";

export const $notes = createStore([]);

const $selectedNoteId = createStore(null);

export const $selectedNote = combine(
  $notes,
  $selectedNoteId,
  (notes, selectedId) => {
    return notes.find(el => el.id === selectedId) || null;
  }
);

export const loadNotes = createEffect().use(() => api.getNotes());
export const createNote = createEffect().use(({ id, content }) => {
  return api.createNote(content);
});

export const updateNote = createEffect().use(r => {
  api.updateNote(r);
});

$notes.on(createNote.done, (state, { result }) => [result].concat(state));

$notes.on(updateNote.done, (state, { params }) => {
  return state.map(el => (params.id === el.id ? params : el));
});

$notes.on(loadNotes.done, (_, { result }) => result);

export const setSelectedNote = createEvent();
$selectedNoteId.on(setSelectedNote, (_, p) => p);

loadNotes.done.watch(({ result }) => {
  if (result[0] && !$selectedNoteId.getState()) {
    setSelectedNote(result[0].id);
  }
});
