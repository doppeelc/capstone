import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import "../styles/NavBar.css";


function NavBar({ logout }) {

    const { currentUser } = useContext(UserContext);

    return (
        <Navbar expand="md" id="NavBar">

            <Nav id="NavBar-Nav" >

                { currentUser.data &&
                <React.StrictMode>
                    <NavItem id="NavBar-others">
                        <NavLink to="/profile" id="NavBar-link">Profile</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/newPost" id="NavBar-link">Create New Post</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/" id="NavBar-link" onClick={logout}>Log Out {currentUser.username}</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-left">
                        <NavLink to="/feed" id="NavBar-link">Posts</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-left">
                        <NavLink to="/following" id="NavBar-link">Following</NavLink>
                    </NavItem>
                </React.StrictMode>
                }
                { !currentUser.data &&
                <React.StrictMode>
                    <NavItem id="NavBar-others">
                        <NavLink to="/login" id="NavBar-link">Login</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/signup" id="NavBar-link">Sign Up</NavLink>
                    </NavItem>
                </React.StrictMode>
                }

            </Nav>
        </Navbar>
    );
}

export default NavBar;