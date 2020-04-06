import React, { useEffect, useReducer } from "react";
import { getTasks } from '../../services/dbQueries'

function tasksReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return [...state, ...action.payload ]
    default:
      return state
  }
}

export const TasksContext = React.createContext()

export const TasksProvider = ({ children }) => {
  const [tasks, dispatch ] = useReducer(tasksReducer, [])

  useEffect(() => {
    let startFetch = true
    async function fetchTasks() {
      if(startFetch) {
        let tasks = await getTasks()
        dispatch({ type: 'SET_TASKS', payload: tasks})
      }
    }
    fetchTasks()
    return () => { startFetch = false }
  }, [])

  return(
    <TasksContext.Provider
      value={{
        tasks,
        dispatch
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
