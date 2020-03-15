import React, { useState, useContext, useEffect } from 'react'
import './views.scss'
import TableTasks from '../components/tables/Table'
import { TasksContext } from '../connectors/tasks'

const OngoingProjects = () => {
  const [assignee, setAssignee] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [taskList, setTaskList] = useState('')
  const [maxItems, setMaxItems] = useState('')
  const [hideCompleted, setHideCompleted] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const { tasks } = useContext(TasksContext)

  useEffect(() => {
    let onlyActive = tasks.filter(task => (task.status !== 'completed' && task.status !== 'cancelled'))
    setPaginationItems(onlyActive)
    setTaskList(onlyActive)
  },[tasks])

  const changeTaskList = () => {
    let newList = tasks
    let filters = {
      status,
      assignee,
      priority
    }

    for (let filter in filters) {
      if (filters[filter]) {
        newList = newList.filter(t => t[filter] === filters[filter])
      }
    }

    let paginationItems = Math.floor(newList.length / 10)
    let sortedList = newList.sort((a, b) => (a.start > b.start) ? 1 : -1)
    let maxItems = paginationItems > 0 ? paginationItems : 1
    setTaskList(sortedList)
    setMaxItems(maxItems)
    setActivePage(1)
  }

  const setPaginationItems = array => {
    let paginationItems = Math.floor(array.length / 10)
    let maxItems = paginationItems > 0 ? paginationItems : 1
    setMaxItems(maxItems)
  }

  const setFilter = async filter => {
    // Need work here
    await this.setState({...filter})
    changeTaskList()
  }

  const clearFilters = async () => {
    setAssignee('')
    setStatus('')
    setPriority('')
    changeTaskList()
  }

  const showHideCompleted = async () => {
    let newList = []
    setHideCompleted(!hideCompleted)
    if (!hideCompleted) {
      newList = tasks.filter(task => (task.status === 'completed' || task.status === 'cancelled'))
      setPaginationItems(newList)
    } else newList = tasks.filter(task => (task.status !== 'completed' && task.status !== 'cancelled'))
    setTaskList(newList)
    setActivePage(1)
    setPaginationItems(newList)
  }

  const conditionalRender = () => {
    if(taskList) return (
      <TableTasks
        list={tasks}
        taskList={taskList}
        changeTaskList={changeTaskList}
        setFilter={setFilter}
        maxItems={maxItems}
        clearFilters={clearFilters}
        assignee={assignee}
        status={status}
        toggleCompleted={showHideCompleted}
        hideCompleted={hideCompleted}
        activePage={activePage}
        setActivePage={setActivePage}
        priority={priority}
      />
    )
    else return 'Waiting'
  }
    return(
      <div className='ongoing-projects'>
        <h2>Ongoing Visits</h2>
        { conditionalRender() }
      </div>
    )
}

export default OngoingProjects;
