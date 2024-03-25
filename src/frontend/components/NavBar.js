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
                    
                <h1 id="NavBar-center" >Factly</h1>

                { currentUser.data &&
                <React.StrictMode>
                    <NavItem id="NavBar-right" data-testid="withUser">
                        <NavLink to="/profile" id="NavBar-link">Profile</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-right">
                        <NavLink to="/newPost" id="NavBar-link">Create New Post</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-right">
                        <NavLink to="/" id="NavBar-link" onClick={logout}>Log Out {currentUser.username}</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-left">
                        <NavLink to="/feed" id="NavBar-link">Posts</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-left">
                        <NavLink to="/following" id="NavBar-link">Following</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-left" >
                        <NavLink to="/likes" id="NavBar-link">Likes</NavLink>
                    </NavItem>
                </React.StrictMode>
                }
                { !currentUser.data &&
                <React.StrictMode>
                    <NavItem id="NavBar-right" data-testid="withoutUser">
                        <NavLink to="/login" id="NavBar-link">Login</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-right">
                        <NavLink to="/signup" id="NavBar-link">Sign Up</NavLink>
                    </NavItem>
                </React.StrictMode>
                }

            </Nav>
        </Navbar>
    );
}

export default NavBar;