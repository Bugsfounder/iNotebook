import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

function Notes () {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <div className="container">
            <h2>Your Notes</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 my-2">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </div>

    )
}

export default Notes
