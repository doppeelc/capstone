import React, { useEffect, useState } from "react";
import "../styles/PostDetails.css";
import UserApi from "../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function Post() {

    const { id } = useParams();
    const [ post, setPost ] = useState(UserApi.getPost(id));
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function getPost() {
            let res = await UserApi.getPost(id);
            setPost(res);
            setIsLoading(false);
        }
        getPost();
    }, [id]);

    if(isLoading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="Post" >
            <p className="Post-content" >
                {post.content}
            </p>
            <p className="Post-username" >
                {post.username}
            </p>
            <p className="Post-time" >
                {post.timePosted.split('.')[0]}
            </p>  
        </div>
    )
}

export default Post;