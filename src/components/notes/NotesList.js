import "medium-draft/lib/index.css";
import React, { useEffect } from "react";
import { Pane, Button, Menu, Spinner } from "evergreen-ui";
import { createStore, createEvent, createEffect, combine } from "effector";
import { useStore } from "effector-react";
import { Editor, createEditorState } from "medium-draft";
import mediumDraftExporter from "medium-draft/lib/exporter";
import { $notes, $selectedNote, setSelectedNote, loadNotes } from "./state";
import { moveSelectionToEnd } from "./utils";

const getHtml = state => mediumDraftExporter(state.getCurrentContent());

function SideList() {
  const notes = useStore($notes);
  const selected = useStore($selectedNote);
  return notes.length ? (
    <Menu>
      {notes.map(el => {
        const selectedProps =
          selected === el ? { icon: "edit", color: "selected" } : undefined;
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
  const item = useStore($selectedNote);
  const createState = () => createEditorState(item.content);
  const [editorState, _onChange] = React.useState(createState);
  const onChange = React.useCallback(s => _onChange(s), []);
  const editorRef = React.createRef();
  React.useEffect(() => {
    editorRef.current.focus();
    onChange(moveSelectionToEnd(editorState));
  }, []);

  return (
    <Editor
      ref={editorRef}
      editorState={editorState}
      onChange={onChange}
      placeholder="Start writing your note..."
    />
  );
}

export const NotesList = () => {
  useEffect(() => {
    loadNotes();
  }, []);
  const note = useStore($selectedNote);
  return (
    <Pane display="flex">
      <Pane minWidth="200px" background="tint2" borderRadius={3}>
        <SideList />
      </Pane>
      <Pane flex={1}>{note ? <EditNote key={note.id} /> : null}</Pane>
    </Pane>
  );
};
