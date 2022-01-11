import React from 'react';
import NoteContext from './NoteContext';
// import { ManishaContext } from './NoteContext';

const NoteState = (props) => {
    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider >
    )
}
export default NoteState;

// export const ManishaState = (props) => {
//     const [mkState, setMkState] = useState("Manisha is a Good Girl");
//     return (
//         <ManishaContext.Provider value={{ mkState, setMkState }}>
//             {props.children}
//         </ManishaContext.Provider>
//     )
// }