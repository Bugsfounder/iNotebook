import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

function NoteItem (props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    let { title, description, dateTime, _id, } = props.note;

    let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const date = new Date(dateTime).toLocaleTimeString("en-us", options)

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}
                        <i className="fas fa-edit mx-5" onClick={() => props.updateNote(props.note)}></i>
                        <i className="fas fa-trash-alt" onClick={() => deleteNote(_id)}></i>
                    </h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{date} </small>
                </div>
            </div>
        </div >
    )
}

export default NoteItem
