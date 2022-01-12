import React from 'react'

export default function Alert (props) {
    const capitalize = (str) => {
        let myStr = str[0].toUpperCase() + str.substring(1, str.length);
        return myStr
    }
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.status} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.status)}: </strong>{props.alert.msg}
            </div>}
        </div>
    )
}