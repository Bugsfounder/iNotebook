import React, { useState } from 'react';
import NoteContext, { ManishaContext } from './NoteContext';

const NoteState = (props) => {
    const s1 = {
        "name": "Manisha",
        "language": "Python"
    };
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Mahi",
                "language": "JavaScript"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;

export const ManishaState = (props) => {
    const [mkState, setMkState] = useState("Manisha is a Good Girl");
    return (
        <ManishaContext.Provider value={{ mkState, setMkState }}>
            {props.children}
        </ManishaContext.Provider>
    )
}