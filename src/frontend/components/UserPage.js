import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import "../styles/ProfilePage.css";
import UserApi from "../api";
import PostFeed from "./PostFeed";
import { useParams, Redirect } from "react-router-dom";


function UserPage() {

    const { username } = useParams();
    const { currentUser } = useContext(UserContext);
    const [ userInfo, setUserInfo ] = useState();
    const [ userPosts, setUserPosts ] = useState();
    const [ following, setFollowing ] = useState(false);
    
    useEffect(() => {
        async function getUserInfo() {
            let userInfo = await UserApi.getUserInfo(username);
            setUserInfo(userInfo);
        }
        async function getPostsFrom() {
            let userPosts = await UserApi.getPostsFrom(username);
            setUserPosts(userPosts);
        }
        async function getIsFollowing() {
            let userFollowing = await UserApi.getUsersFollowed(currentUser.data.username);
            setFollowing(userFollowing.includes(username));
        }
        getIsFollowing();
        getUserInfo();
        getPostsFrom();
    }, [username, currentUser]);

    async function toggleFollowUser() {
        if(following) {
            await UserApi.unFollowUser(currentUser.data.username, username);
            setFollowing(false);
        } else {
            await UserApi.followUser(currentUser.data.username, username);
            setFollowing(true);
        }
    }

    if(!(userInfo && userPosts && currentUser)) {
        return <p>Loading...</p>
    }

    if(currentUser.data.username === username) {
        return <Redirect to="/profile" />
    }
    
    return (
        <div className="UserPage">
            <h1>{userInfo.displayName}</h1>
            <h3>{username}</h3>
            <button className="UserPage-follow" onClick={toggleFollowUser} >{following ? "Unfollow" : "Follow"}</button>
            <PostFeed username={username} />
        </div>
    );
}

export default UserPage;