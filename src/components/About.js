import React, { useContext, useEffect } from 'react';
import noteContext, { ManishaContext } from '../context/notes/NoteContext';


export const About = () => {
    const a = useContext(noteContext)
    const mk = useContext(ManishaContext)
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            This is About {a.state.name} and her favourite language is {a.state.language} {mk.mkState}
        </div>
    )
}
