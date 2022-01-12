import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // SAVE THE AUTH TOKEN AND REDIRECT
            localStorage.setItem("token", json.authToken);
            history.push('/')
        } else {
            alert("Invalid Credentials");
        }
    }
    return (
        <div>
            <h2 className='my-3'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={handleChange} className="form-control" id="password" name="password" value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
