import React from 'react'

function NoteItem (props) {
    let { title, description, tag, dateTime } = props.note;

    let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const date = new Date(dateTime).toLocaleTimeString("en-us", options)

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{date} </small>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
