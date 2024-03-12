import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import UserApi from "../api";
import Post from "./Post";
import "../styles/PostFeed.css";

function PostFeed({ username, followingOnly = false }) {

    
    const { currentUser } = useContext(UserContext);
    const [ posts, setPosts ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function getPosts() {
            let ps;
            if(followingOnly) {
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
    }, [followingOnly]);


    if(isLoading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="PostFeed" >
            {posts.map(p => (
                <Post postId={p.id} />
            ))}
        </div>
    );
}

export default PostFeed;