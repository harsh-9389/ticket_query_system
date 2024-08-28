import '../assets/register.css'
import { useState } from "react";
import axios from "axios";

export default function Form() {
    // States for registration
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        e.preventDefault();

        axios.post('http://localhost:5000/login', {email, password}).then(response => {
            console.log('details sent for auth', response.data);
        }).catch(error => {
            console.error('error occurred in sending data to backend', error);
        })
    };

    return (
        <div className="form">
            <div>
                <h1>User Login</h1>
            </div>

            <form>
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

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
