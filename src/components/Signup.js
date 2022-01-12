import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "password": "",
        "confirmPassword": ""
    });

    let history = useHistory()

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })


    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (credentials.password === credentials.confirmPassword) {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    phone: credentials.phone,
                    password: credentials.password
                })
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // SAVE THE AUTH TOKEN AND REDIRECT
                history.push('/login');
                props.showAlert("Acoung Created Successfully", "success");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        } else {
            props.showAlert("Confirm password not match", "warning");
        }
    }

    return (
        <div className='container my-2'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" maxLength={10} className="form-control" onChange={handleChange} id="name" name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="phone" className="form-control" id="phone" name='phone' onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} name='password' required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" onChange={handleChange} name='confirmPassword' required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
