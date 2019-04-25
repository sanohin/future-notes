// @flow
import React from "react";
import { useStore } from "effector-react";
import { Editor } from "medium-draft";
import { Button } from "../ui";
import { $editorState } from "./state";
import { updateNoteState, deleteNote } from "./workflow";
import { moveSelectionToEnd } from "./utils";
import type { Note } from "../../types";
import { DeleteContainer } from "./styled";
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
      <DeleteContainer>
        <Button onClick={handleDelete}>Delete</Button>
      </DeleteContainer>
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
