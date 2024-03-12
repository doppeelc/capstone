import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import "../styles/ProfilePage.css";
import UserApi from "../api";
import PostFeed from "./PostFeed";


function ProfilePage() {

    const { currentUser } = useContext(UserContext);

    const INIT_STATE = {
                username:currentUser.data.username,
                displayName:currentUser.data.displayName,
                email:currentUser.data.email,
                password:""
            };

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
        UserApi.updateUser(formData);
        setFormData(formData => ({
            ...formData,
            password:""
        }));
    }


    return (
        <div id="ProfilePage">
            <h1>Profile</h1>
            <form id="ProfilePage-form" onSubmit={handleSubmit}>
                <label id="lbl" htmlFor="username">Username</label>
                <input
                    id="inpt"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly />
                
                <label id="lbl" htmlFor="displayName">Display Name</label>
                <input
                    id="inpt"
                    name="displayName"
                    placeholder="Display Name"
                    value={formData.displayName}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="email">Email</label>
                <input
                    id="inpt"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange} />
                    
                <label id="lbl" htmlFor="password">Password</label>
                <input
                    id="inpt"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                <button>Update Info</button>
            </form>
            <div className="ProfilePage-posts">
                <PostFeed username={currentUser.data.username} />
            </div>
        </div>
    );
}

export default ProfilePage;