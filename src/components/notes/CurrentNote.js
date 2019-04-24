// @flow
import React from "react";
import classes from "./styles.css";
import { useStore } from "effector-react";
import { Editor } from "medium-draft";
import { IconButton } from "evergreen-ui";
import { $editorState } from "./state";
import { updateNoteState, deleteNote } from "./workflow";
import { moveSelectionToEnd } from "./utils";
import type { Note } from "../../types";
import "medium-draft/lib/index.css";

export function EditNote({ item }: { item: Note }) {
  const editorRef = React.createRef();
  const editorState = useStore($editorState);
  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
      updateNoteState(moveSelectionToEnd(editorState));
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
        editorState={editorState}
        onChange={updateNoteState}
        placeholder="Start writing your note..."
        sideButtons={[]}
      />
    </>
  );
}
