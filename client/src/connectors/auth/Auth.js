import React, { useEffect, useState, useReducer } from "react";
import firebaseApp from "../../config/firebaseConfig";
import { getCoaches } from '../../services/dbQueries'

function userProfileReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        userProfile: action.payload
      }
    case 'LOGOUT':
      return {
        userProfile: '',
      }
    default:
      return state
  }
}

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [ coaches, setCoaches ] = useState([])
  const [ {userProfile}, dispatch ] = useReducer(userProfileReducer, {
    userProfile: ''
  })

  // Authenticate
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  // Get coaches
  useEffect(() => {
    let startFetch = true
    async function fetchCoaches(){
      if(startFetch) {
        let coaches = await getCoaches()
        setCoaches(coaches)
      }
    }
    fetchCoaches();
    return () => { startFetch = false }
  }, [])

  // Setup User profile
  useEffect(() => {
    if(currentUser) {
      let coach = coaches.find( coach => coach.email.toLowerCase() === currentUser.email.toLowerCase())
      console.log(coach);
      dispatch({ type: 'LOGIN', payload: coach })
    }
  }, [currentUser, coaches])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        coaches,
        userProfile,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};