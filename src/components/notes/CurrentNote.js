// @flow
import React from "react";
import classes from "./styles.css";
import { useStore } from "effector-react";
import { Editor } from "medium-draft";
import { IconButton } from "evergreen-ui";
import { $selectedNote } from "./state";
import { updateNoteState, deleteNote } from "./state";
import { moveSelectionToEnd } from "./utils";

export function EditNote() {
  const item = useStore($selectedNote);
  const editorRef = React.createRef();
  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
      updateNoteState(moveSelectionToEnd(item.editorState));
    }
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
