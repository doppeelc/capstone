import { useEffect, useState } from 'react';
import Routes from './Routes';
import UserContext from './UserContext';
import NavBar from './NavBar';
import UserApi from '../api';
import { jwtDecode } from "jwt-decode";
import '../styles/App.css';
import FactsApi from '../factsApi';
import { BrowserRouter } from 'react-router-dom';

function App() {

    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [ currentUser, setCurrentUser ] = useState({
        loaded:false,
        data:null
    });
    const [ error, setError ] = useState();

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
      let res;
      try {
        res = await UserApi.register(user);
      } catch (err) {
        setError(400 ? "Invalid user data" : "Something went wrong");
        return;
      }
      setError();
      setToken(res);
      localStorage.setItem("token", res);
      window.location.href = "/profile";
    }
  
    async function login(username, password) {
      let res;
      try {
        res = await UserApi.login(username, password);
      } catch (err) {
        setError(401 ? err.message : "Something went wrong");
        return;
      }
      setError();
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
  
    if(!currentUser.loaded) {
      return <p>Loading...</p>
    }

  return (
    <BrowserRouter className="App">
        <UserContext.Provider value={{
            currentUser:currentUser,
            number:{getNumberFact},
            advice:{getAdvice},
            chuck:{getChuckJoke},
            makePost:{makePost}
        }}>
            <NavBar currentUser={currentUser.data}
                    logout={logout} />
            
            {error &&
            <div className='App-error'>
                <p className='App-error-text'>
                    {error}
                </p>
            </div>
            }

            <Routes currentUser={currentUser.data}
                    signup={signup}
                    login={login} />
        </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
