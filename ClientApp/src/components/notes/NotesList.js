import React, { useState } from 'react';
import { Pane, Textarea, Button } from 'evergreen-ui';
import { unstable_createResource } from 'react-cache';
import { getNotes, updateNote, createNote } from '../../api';

const notesResource = unstable_createResource(getNotes);

const Note = ({ value, id, save }) => {
  const [localText, changeText] = useState(value);
  const hasDiff = value !== localText;
  return (
    <Pane marginTop={24} display="flex">
      <form
        style={{ display: 'contents' }}
        onSubmit={e => {
          e.preventDefault();
          save(id, localText);
        }}
      >
        <Textarea
          value={localText}
          placeholder="Enter text here"
          onChange={e => changeText(e.target.value)}
        />
        <Pane width={100}>
          {hasDiff && (
            <Button type="submit" marginLeft={8}>
              Save
            </Button>
          )}
        </Pane>
      </form>
    </Pane>
  );
};

export const NotesList = () => {
  const notes = notesResource.read();
  const onChange = (id, value) => {
    return updateNote({ id, content: value }).then(() => {
      // update cache ?
    });
  };
  const add = (id, content) => {
    createNote(content);
  };
  return (
    <Pane padding={24}>
      <Note id={0} value="" save={add} />
      {notes.map(note => (
        <Note key={note.id} id={note.id} value={note.content} save={onChange} />
      ))}
    </Pane>
  );
};
