import "medium-draft/lib/index.css";
import React, { useEffect } from "react";
import { Pane, Menu, Spinner, Text, IconButton } from "evergreen-ui";
import { useStore } from "effector-react";
import { Editor } from "medium-draft";
import {
  $notes,
  $notesList,
  $selectedNote,
  setSelectedNote,
  loadNotes,
  createNote,
  updateNoteState,
  deleteNote,
  $selectedNoteId
} from "./state";
import { moveSelectionToEnd, getPreviewText, useMap } from "./utils";
import classes from "./styles.css";

function NoteItem({ id, ...rest }) {
  const current = useMap($notes, x => x[id]);
  const onSelect = React.useCallback(() => setSelectedNote(id), [id]);
  const preview = React.useMemo(() => {
    const firstLine = getPreviewText(current.content).split("\n")[0] || "";
    return firstLine
      .split(" ")
      .slice(0, 4)
      .join(" ")
      .trim();
  }, [current.content]);
  return (
    <Menu.Item onSelect={onSelect} {...rest}>
      <Text color={!preview ? "muted" : "black"}>
        <div className={classes.noteText}>{preview || "Untitled"}</div>
      </Text>
    </Menu.Item>
  );
}

function SideList() {
  const noteIds = useStore($notesList);
  const selected = useStore($selectedNoteId);
  return noteIds.length ? (
    <Menu>
      <div className={classes.notesList}>
        <Menu.Item icon="plus" onSelect={createNote}>
          Create a note
        </Menu.Item>
        {noteIds.map(el => {
          const selectedProps =
            selected === el ? { icon: "edit", color: "selected" } : undefined;
          return <NoteItem key={el} id={el} {...selectedProps} />;
        })}
      </div>
    </Menu>
  ) : (
    <Spinner />
  );
}

function EditNote() {
  const item = useStore($selectedNote);
  const editorRef = React.createRef();
  React.useEffect(() => {
    editorRef.current.focus();
    updateNoteState(moveSelectionToEnd(item.editorState));
  }, []);

  const handleDelete = React.useCallback(() => deleteNote(item.id), [item.id]);

  return (
    <>
      <div className={classes.deleteContainer}>
        <IconButton
          appearance="minimal"
          intent="danger"
          icon="trash"
          onClick={handleDelete}
        />
      </div>
      <Editor
        ref={editorRef}
        editorState={item.editorState}
        onChange={updateNoteState}
        placeholder="Start writing your note..."
        sideButtons={[]}
      />
    </>
  );
}

export const NotesList = () => {
  useEffect(() => {
    loadNotes();
  }, []);
  const noteId = useStore($selectedNoteId);
  return (
    <div className={classes.appContainer}>
      <Pane minWidth="200px" background="tint2" borderRadius={3}>
        <SideList />
      </Pane>
      <div className={classes.noteContainer}>
        {noteId ? <EditNote key={noteId} /> : null}
      </div>
    </div>
  );
};
