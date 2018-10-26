import React, { useState } from 'react';
import { Pane, Textarea, Icon } from 'evergreen-ui';

const notes = [
  { text: 'a', id: 1 },
  { text: 'b', id: 2 },
  { text: 'c', id: 3 }
];

const IconPlaceholder = () => (
  <div style={{ height: 16, width: 16, marginLeft: 8 }} />
);

const Note = ({ value }) => {
  const [localText, changeText] = useState(value);
  const hasDiff = value !== localText;
  return (
    <Pane marginTop={24} display="flex">
      <Textarea value={localText} onChange={e => changeText(e.target.value)} />
      {hasDiff ? (
        <Icon icon="edit" color="selected" marginLeft={8} />
      ) : (
        <IconPlaceholder />
      )}
    </Pane>
  );
};

export const NotesList = () => {
  return (
    <Pane padding={24}>
      {notes.map(note => (
        <Note key={note.id} value={note.text} />
      ))}
    </Pane>
  );
};
