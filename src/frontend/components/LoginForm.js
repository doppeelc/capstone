import React, { useState, useEffect } from "react";
import "../styles/LoginForm.css";


function LoginForm({ login }) {

    const INIT_STATE = {
        username:"",
        password:""
    }
    
    const [formData, setFormData] = useState(INIT_STATE);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]:value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(formData.username, formData.password);
    }

    return (
        <div>
            <h1>Log In</h1>
            <form id="LoginForm" onSubmit={handleSubmit}>
                <label id="lbl" htmlFor="username">Username</label>
                <input
                    id="inpt"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="password">Password</label>
                <input
                    id="inpt"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange} />
                <button>Log in</button>
            </form>
        </div>
        
    );
}

export default LoginForm;