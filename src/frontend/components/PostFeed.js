import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import UserApi from "../api";
import Post from "./Post";
import "../styles/PostFeed.css";

function PostFeed({ username, followingOnly, likedOnly }) {

    
    const { currentUser } = useContext(UserContext);
    const [ posts, setPosts ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ liked, setLiked ] = useState([]);

    useEffect(() => {
        async function getPosts() {
            let ps;
            let likedPosts = await UserApi.getLikes(currentUser.data.username);
            setLiked(likedPosts);
            if(likedOnly) {
                ps = likedPosts;
            } else if(followingOnly) {
                ps = await UserApi.getFollowingPosts(currentUser.data.username);
            } else if(username) {
                ps = await UserApi.getPostsFrom(username);
            } else {
                ps = await UserApi.getAllPosts();
            }
            setPosts(ps);
            setIsLoading(false);
        }
        getPosts();
    }, [currentUser, username, followingOnly, likedOnly]);

    if(isLoading) {
        return <p>Loading...</p>;
    }

    function isLiked(postId) {
        let likedIds = liked.map(p => p.id);
        return likedIds.includes(postId);
    }
    
    return (
        <div className="PostFeed" >
            {posts.map(p => (
                        <Post key={p.id}
                              post={p}
                              isLiked={isLiked} />
                        ))}
        </div>
    );
}

export default PostFeed;