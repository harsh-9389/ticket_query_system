import '../assets/register.css'
import {useEffect, useState} from "react";
import axios from 'axios'

export default function Form() {
    // States for registration
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handling the name change
    const handleName = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        console.log('working')
        e.preventDefault();

        axios.post('http://localhost:5000/register', {name, email, password}).then(res =>{
            alert('data sent successfully');
        }).catch ((error) =>{
            console.error('error occurred in sending data to backend', error);
        })
    };

    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>

            <form method="POST">
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input
                    onChange={handleName}
                    className="input"
                    value={name}
                    type="text"
                    placeholder= 'name'
                />

                <label className="label">Email</label>
                <input
                    onChange={handleEmail}
                    className="input"
                    value={email}
                    type="email"
                    placeholder= 'email'
                />

                <label className="label">Password</label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    type="password"
                    placeholder= 'password'
                />

                <button onClick={handleSubmit} className="btn" type="submit" value= 'submit'>
                    Submit
                </button>
            </form>
        </div>
    );
}
