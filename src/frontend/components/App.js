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
                    JoblyApi.token = token;
                    let user = await JoblyApi.getCurrentUser(username);
                    setCurrentUser({loaded:true, data:user});
                    setApplications(user.applications);
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
    }
  
    async function login(username, password) {
      let res = await UserApi.login(username, password);
      setToken(res);
      localStorage.setItem("token", res);
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
  
    if(!currentUser.loaded) {
      return <p>Loading...</p>
    }

  return (
    <div className="App">
        <UserContext.Provider value={{
            currentUser:currentUser,
            number:{getNumberFact} ,
            advice:{getAdvice},
            chuck:{getChuckJoke}
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
