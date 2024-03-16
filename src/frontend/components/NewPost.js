import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import "../styles/NewPost.css";


function NewPost() {
    const { currentUser, number, advice, chuck, makePost } = useContext(UserContext);

    const [formData, setFormData] = useState({
        fact:""
    });

    if(!currentUser.loaded) {
        return <p>Loading...</p>
    }

    async function doNumber() {
        let fact = await number.getNumberFact();
        setFormData({fact});
    }

    async function doAdvice() {
        let fact = await advice.getAdvice();
        setFormData({fact});
    }

    async function doChuck() {
        let fact = await chuck.getChuckJoke();
        setFormData({fact});
    }

    async function postPost(e) {
        e.preventDefault();
        await makePost.makePost(formData.fact);
        setFormData({fact:""});
        window.location.href = "/profile";
    }


    return (
        <div id="NewPost" >
            <div id="NewPost-options" >
                <button id="NewPost-button" onClick={doNumber} >Number Fact</button>
                <button id="NewPost-button" onClick={doAdvice} >Life Advice</button>
                <button id="NewPost-button" onClick={doChuck} >Chuck Norris Joke</button>
            </div>
            <form id="NewPost-form" onSubmit={postPost} >
                <p id="NewPost-post" >{formData.fact}</p>
                <button id="NewPost-formButton" >Post</button>
            </form>
        </div>
    )
}

export default NewPost;