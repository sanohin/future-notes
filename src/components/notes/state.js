// @flow
import {
  createEvent,
  createStore,
  createEffect,
  combine,
  forward
} from "effector";
import type { Store } from "effector";
import { addDevtools, createInitialState } from "./utils";
import type { Note } from "../../types";

export const $notes = createStore<{ [id: string]: Note }>({});
export const $notesList = createStore<Array<string>>([]);

export const $selectedNoteId = createStore<string | null>(null);
export const $selectedNote: Store<Note | null> = combine(
  $notes,
  $selectedNoteId,
  (notes, selectedId) => {
    if (selectedId) {
      return notes[selectedId] || null;
    }
    return null;
  }
);

export const $editorState = createStore<any>(createInitialState());

const debugStores = { $notes, $notesList, $selectedNoteId, $selectedNote };
addDevtools(debugStores);
