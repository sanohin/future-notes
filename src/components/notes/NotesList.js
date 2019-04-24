// @flow
import React from "react";
import { Menu, Spinner, Text, IconButton } from "evergreen-ui";
import { useStore } from "effector-react";
import { $notes, $notesList, $selectedNoteId } from "./state";
import { setSelectedNote, createNote } from "./workflow";
import { useMap } from "./utils";
import classes from "./styles.css";

function NoteItem({ id, ...rest }) {
  const preview = useMap($notes, x => x[id].preview);
  const onSelect = React.useCallback(() => setSelectedNote(id), [id]);
  return (
    <Menu.Item onSelect={onSelect} {...rest}>
      <Text color={!preview ? "muted" : "black"}>
        <div className={classes.noteText}>{preview || "Untitled"}</div>
      </Text>
    </Menu.Item>
  );
}

export function NotesList() {
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
