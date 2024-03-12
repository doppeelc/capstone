import React, { useEffect, useState } from "react";
import "../styles/Post.css";
import UserApi from "../api";
import { NavLink, NavItem } from "reactstrap";


function Post({ postId }) {

    const [ post, setPost ] = useState(UserApi.getPost(postId));
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function getPost() {
            let res = await UserApi.getPost(postId);
            setPost(res);
            setIsLoading(false);
        }
        getPost();
    }, [postId]);

    if(isLoading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="Post" >
            <p className="Post-content" >
                {post.content}
            </p>
            <p className="Post-time" >
                {post.timePosted.split('.')[0].replace("T", " at ")}
            </p>
            <NavLink className="Post-username" href={`/users/${post.username}`} >
                {post.username}
            </NavLink>
        </div>
    )
}

export default Post;