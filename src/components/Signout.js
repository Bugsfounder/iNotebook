import React from 'react'
import { useHistory } from 'react-router-dom';

const Signout = (props) => {
    let history = useHistory();
    localStorage.removeItem('token')
    history.push('/login')
    return (
        <div>
            {props.showAlert("Log Out Successfully", "success")}
        </div>
    )
}

export default Signout
