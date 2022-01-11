import React, { useState } from 'react';
import NoteContext from './NoteContext';
// import { ManishaContext } from './NoteContext';

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "61d84cc2cae004201bc6837f",
            "user": "61d802fd6ffb3661151e9089",
            "title": "This is my title",
            "description": "This is my Desctiption And there is no description at all",
            "tag": "personal",
            "dateTime": "2022-01-07T14:22:58.657Z",
            "__v": 0
        },
        {
            "_id": "61d84cc3cae004201bc68381",
            "user": "61d802fd6ffb3661151e9089",
            "title": "This is my title",
            "description": "This is my Desctiption And there is no description at all",
            "tag": "personal",
            "dateTime": "2022-01-07T14:22:59.808Z",
            "__v": 0
        },
        {
            "_id": "61d84cc4cae004201bc68383",
            "user": "61d802fd6ffb3661151e9089",
            "title": "This is my title",
            "description": "This is my Desctiption And there is no description at all",
            "tag": "personal",
            "dateTime": "2022-01-07T14:23:00.154Z",
            "__v": 0
        },
        {
            "_id": "61d84cc4cae004201bc68385",
            "user": "61d802fd6ffb3661151e9089",
            "title": "This is my title",
            "description": "This is my Desctiption And there is no description at all",
            "tag": "personal",
            "dateTime": "2022-01-07T14:23:00.367Z",
            "__v": 0
        },
        {
            "_id": "61d8fd890b0a50407bfa5c53",
            "user": "61d802fd6ffb3661151e9089",
            "title": "New Note",
            "description": "Please Access the playlist",
            "tag": "YouTube",
            "dateTime": "2022-01-08T02:57:13.324Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider >
    )
}
export default NoteState;
