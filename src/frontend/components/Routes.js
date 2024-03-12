import React from "react";
import { Route, Switch } from "react-router-dom";
import PostFeed from "./PostFeed";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ProfilePage from "./ProfilePage";
import NewPost from "./NewPost";
import PostDetails from "./PostDetails";
import UserPage from "./UserPage";
import Home from "./Home";


function Routes({ currentUser, signup, login }) {

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            {currentUser &&
            <React.StrictMode>

                <Route exact path="/feed">
                    <PostFeed />
                </Route>

                <Route exact path="/following">
                    <PostFeed followingOnly={true} />
                </Route>

                <Route exact path="/posts/:id">
                    <PostDetails />
                </Route>
                
                <Route exact path="/users/:username">
                    <UserPage />
                </Route>

                <Route exact path="/newPost">
                    <NewPost />
                </Route>
                
                <Route exact path="/profile">
                    <ProfilePage />
                </Route>  
            </React.StrictMode>
            }
            
            {!currentUser &&
            <React.StrictMode>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route> 
            </React.StrictMode>
            }
            
                            
        </Switch>
    );
}

export default Routes;