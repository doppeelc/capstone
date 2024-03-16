import React, { useContext, useEffect, useState } from "react";
import UserApi from "../api";
import UserContext from "./UserContext";
import "../styles/Post.css";


function Post({ post, isLiked }) {

    const { currentUser } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ liked, setliked ] = useState(false);
    const [ isUsers, setIsUsers ] = useState(false);
    const [ isDeleted, setIsDeleted ] = useState(false);

    useEffect(() => {
        async function getIsLiked() {
            setliked(isLiked(post.id));
            setIsUsers(currentUser.data.username == post.username);
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

    async function deletePost() {
        await UserApi.deletePost(post.id);
        setIsDeleted(true);
    }

    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(isDeleted) {
        return;
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
            {isUsers && <button onClick={deletePost} >Delete Post</button>}
            <button onClick={toggleLike} >{ liked ? "Unlike" : "Like" }</button>
        </div>
    )
}

export default Post;