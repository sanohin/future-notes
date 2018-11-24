import React, { useState, useEffect } from 'react';
import { Pane, Textarea, Button } from 'evergreen-ui';
import { getNotes, updateNote, createNote } from '../../api';

const Note = ({ value, id, save, loading }) => {
  const [localText, changeText] = useState(value);
  const hasDiff = value !== localText;
  return (
    <Pane marginTop={24} display="flex">
      <form
        style={{ display: 'contents' }}
        onSubmit={e => {
          e.preventDefault();
          save(id, localText).then(next => {
            changeText(next);
          });
        }}
      >
        <Textarea
          value={localText}
          placeholder="Enter text here"
          onChange={e => changeText(e.target.value)}
        />
        <Pane width={100}>
          {hasDiff && (
            <Button isLoading={loading} type="submit" marginLeft={8}>
              Save
            </Button>
          )}
        </Pane>
      </form>
    </Pane>
  );
};

function setLoading(id) {
  return s => ({ ...s, [id]: true });
}
function unsetLoading(id) {
  return s => ({ ...s, [id]: false });
}
const newNoteId = 'new';
export const NotesList = () => {
  const [notes, updateNotes] = useState([]);
  const [loading, updateLoading] = useState({});

  const onChange = (id, content) => {
    updateLoading(setLoading(id));
    return updateNote({ id, content }).then(
      () => {
        updateLoading(unsetLoading(id));
        updateNotes(notes =>
          notes.map(el => (el.id === id ? { ...el, content } : el))
        );
        return content;
      },
      () => updateLoading(unsetLoading(id))
    );
  };
  const addNote = (_, content) => {
    updateLoading(setLoading(newNoteId));

    return createNote(content).then(
      res => {
        updateLoading(unsetLoading(newNoteId));

        updateNotes(notes => notes.concat(res));
        return '';
      },
      () => updateLoading(unsetLoading(newNoteId))
    );
  };
  useEffect(() => {
    getNotes().then(next => updateNotes(next));
  }, []);
  return (
    <Pane padding={24}>
      <Note id={0} value="" save={addNote} loading={loading[newNoteId]} />
      {notes.map(note => (
        <Note
          key={note.id}
          id={note.id}
          loading={loading[note.id]}
          value={note.content}
          save={onChange}
        />
      ))}
    </Pane>
  );
};
