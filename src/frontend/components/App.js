import { useEffect, useState } from 'react';
import Routes from './Routes';
import UserContext from './UserContext';
import NavBar from './NavBar';
import UserApi from '../api';
import { jwtDecode } from "jwt-decode";
import '../styles/App.css';
import FactsApi from '../factsApi';

function App() {

    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [ currentUser, setCurrentUser ] = useState({
        loaded:false,
        data:null
    });

    useEffect(
        function loadUser() {
    
            async function getUser() {
                if(token) {
                try {
                    let { username } = jwtDecode(token);
                    UserApi.token = token;
                    let user = await UserApi.getCurrentUser(username);
                    setCurrentUser({loaded:true, data:user});
                } catch (e) {
                    setCurrentUser({loaded:true, data:null});
                }
                } else {
                    setCurrentUser({loaded:true, data:null});
                }
            }
            getUser();
        },
        [token]
    );

    async function signup(user) {
      let res = await UserApi.register(user);
      setToken(res);
      localStorage.setItem("token", res);
      window.location.href = "/profile";
    }
  
    async function login(username, password) {
      let res = await UserApi.login(username, password);
      setToken(res);
      localStorage.setItem("token", res);
      window.location.href = "/profile";
    }
  
    function logout() {
      setCurrentUser({loaded:true, data:null});
      setToken(null);
      localStorage.removeItem("token");
    }
  
    async function getNumberFact() {
        let fact = await FactsApi.getNumbersFact();
        return fact;
    }

    async function getAdvice() {
        let advice = await FactsApi.getAdvice();
        return advice;
    }

    async function getChuckJoke() {
        let joke = await FactsApi.getChuckJoke();
        return joke;
    }

    async function makePost(content) {
        let post = await UserApi.makePost(content);
        return post;
    }

    async function follow(username) {
        let user = await UserApi.followUser(currentUser.data.username, username);
        return user;
    }

    async function unFollow(username) {
        let user = await UserApi.unFollowUser(currentUser.data.username, username);
        return user;
    }
  
    if(!currentUser.loaded) {
      return <p>Loading...</p>
    }

  return (
    <div className="App">
        <UserContext.Provider value={{
            currentUser:currentUser,
            number:{getNumberFact} ,
            advice:{getAdvice},
            chuck:{getChuckJoke},
            makePost:{makePost},
            follow:{follow},
            unFollow:{unFollow}
        }}>
            <NavBar currentUser={currentUser.data}
                    logout={logout} />

            <Routes currentUser={currentUser.data}
                    signup={signup}
                    login={login} />
        </UserContext.Provider>
    </div>
  );
}

export default App;
