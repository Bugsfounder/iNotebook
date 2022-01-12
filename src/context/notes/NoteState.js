import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

    // ADD A NOTE
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkODAyZmQ2ZmZiMzY2MTE1MWU5MDg5In0sImlhdCI6MTY0MTU1ODQ0OX0.f5ZWKvwkX-9Al1MisOrA5KUY--stOytfoTe82skxo3U'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json()
        setNotes(notes.concat(note));
    }

    // GET ALL NOTES
    const getNotes = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkODAyZmQ2ZmZiMzY2MTE1MWU5MDg5In0sImlhdCI6MTY0MTU1ODQ0OX0.f5ZWKvwkX-9Al1MisOrA5KUY--stOytfoTe82skxo3U'
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // DELETE A NOTE
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkODAyZmQ2ZmZiMzY2MTE1MWU5MDg5In0sImlhdCI6MTY0MTU1ODQ0OX0.f5ZWKvwkX-9Al1MisOrA5KUY--stOytfoTe82skxo3U'
            },
        });
        const json = response.json();

        const newNotes = notes.filter((note) => {
            return note._id !== id
        });
        setNotes(newNotes);
    }

    // ADIT A NOTE
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkODAyZmQ2ZmZiMzY2MTE1MWU5MDg5In0sImlhdCI6MTY0MTU1ODQ0OX0.f5ZWKvwkX-9Al1MisOrA5KUY--stOytfoTe82skxo3U'
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes));
        // LOGIC TO EDIT NOTE IN CLIENT SIDE
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    const [notes, setNotes] = useState(notesInitial)


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider >
    )
}
export default NoteState;
