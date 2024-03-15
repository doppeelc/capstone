import React, { useContext, useEffect, useState } from "react";
import UserApi from "../api";
import UserContext from "./UserContext";
import "../styles/Post.css";


function Post({ post, isLiked }) {

    const { currentUser } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ liked, setliked ] = useState(false);

    useEffect(() => {
        async function getIsLiked() {
            setliked(isLiked(post.id));
            setIsLoading(false);
        }
        getIsLiked();
    }, [currentUser, post, isLiked]);

    async function toggleLike() {
        if(liked) {
            await UserApi.unLikePost(currentUser.data.username, post.id);
            setliked(false);
        } else {
            await UserApi.likePost(currentUser.data.username, post.id);
            setliked(true);
        }
    }

    if(isLoading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="Post" >
            <a className="Post-username" href={`/users/${post.username}`} >
                {post.username}
            </a>
            <p className="Post-content" >
                {post.content}
            </p>
            <p className="Post-time" >
                {post.timePosted.split('.')[0].replace("T", " at ")}
            </p>
            <button onClick={toggleLike} >{ liked ? "Unlike" : "Like" }</button>
        </div>
    )
}

export default Post;