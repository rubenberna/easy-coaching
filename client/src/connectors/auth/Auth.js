import React, { useEffect, useState, useReducer } from "react";
import {firebaseApp} from "../../config/firebaseConfig";
import { getCoaches, getOffices } from '../../services/dbQueries'

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

function coachesReducer(state, action) {
  switch (action.type) {
    case 'SET_COACHES':
      return action.payload
    default:
      return state
  }
}

function officesReducer(state, action) {
  switch (action.type) {
    case 'SET_OFFICES':      
      return action.payload
    default:
      return state
  }
}

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [{ userProfile }, dispatch] = useReducer(userProfileReducer, {
    userProfile: ''
  });
  const [coaches, dispatchCoaches] = useReducer(coachesReducer, []);
  const [offices, dispatchOffices] = useReducer(officesReducer, []);

  // Authenticate
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  // Get coaches
  useEffect(() => {
    let startFetch = true
    async function fetchCoaches() {
      if (startFetch) {
        let coaches = await getCoaches()
        dispatchCoaches({
          type: 'SET_COACHES',
          payload: coaches
        })
      }
    }

    async function fetchOffices() {
      if (startFetch) {
        let offices = await getOffices()
        dispatchOffices({
          type: 'SET_OFFICES',
          payload: offices
        })
      }
    }
    fetchCoaches();
    fetchOffices();
    return () => { startFetch = false }
  }, [])

  // Setup User profile
  useEffect(() => {
    if (currentUser) {
      let loginEmail = currentUser.email.toLowerCase()
      let coach = coaches.find(coach => coach.email.toLowerCase() === loginEmail)
      let office = offices.find(office => office.email.toLowerCase() === loginEmail)

      let user = coach ? coach : office
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [currentUser, coaches, offices])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        coaches,
        userProfile,
        dispatch,
        dispatchCoaches,
        offices,
        dispatchOffices
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
