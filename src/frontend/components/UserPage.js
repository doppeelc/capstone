import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import "../styles/ProfilePage.css";
import UserApi from "../api";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


function UserPage() {

    const { follow, unFollow } = useContext(UserContext);
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

    function toggleFollowUser() {
        if(following) {
            unFollow.unFollow(username);
            setFollowing(false);
        } else {
            follow.follow(username);
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
            {userPosts.map(p => (
                <Post key={p.id}
                      postId={p.id} />
            ))}
        </div>
    );
}

export default UserPage;