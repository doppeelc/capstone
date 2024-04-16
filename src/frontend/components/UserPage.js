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
    const [ isError, setIsError ] = useState(false);
    
    useEffect(() => {
        async function getUserInfo() {
            let userInfo;
            try {
                userInfo = await UserApi.getUserInfo(username);
            } catch (err) {
                setIsError(true);
            }
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
        getUserInfo();
        if(!isError) {
            getIsFollowing();
            getPostsFrom();
        }
    }, [username, currentUser, isError]);

    if(isError) {
        return (
            <div className="ProfilePage-error">
                <p className="ProfilePage-error-text">
                    No user with username: {username}
                </p>
            </div>
        );
    }

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
        <div id="ProfilePage">
            <h1>{userInfo.displayName}</h1>
            <h3>{username}</h3>
            <button id="UserPage-follow" onClick={toggleFollowUser} >{following ? "Unfollow" : "Follow"}</button>
            <PostFeed username={username} />
        </div>
    );
}

export default UserPage;