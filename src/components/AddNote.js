import React, { useContext, useState } from 'react';
import NoteContext from "../context/notes/NoteContext";
import Notes from './Notes';

function AddNote () {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "General" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Note Title</label>
                        <input type="text" minLength={5} required className="form-control" placeholder='Enter Note Title' id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Note Description</label>
                        <input type="text" minLength={5} value={note.description} required className="form-control" placeholder='Enter Note Description' id="description" name='description' onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Note Tag</label>
                        <input type="text" className="form-control" value={note.tag} placeholder='Enter Note Tag' id="tag" name='tag' onChange={handleChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description < 5} type="submit" className="btn btn-sm btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
