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

  useEffect(() => {
    changeTaskList()
  }, [assignee, status, priority])

  const changeTaskList = () => {
    let newList = tasks
    let filters = {
      status,
      assignee,
      priority
    }

    let noFilters = Object.values(filters).every(f => f === undefined)
    if (noFilters) resetTaskList()
    else {
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
  }

  const setPaginationItems = array => {
    let paginationItems = Math.floor(array.length / 10)
    let maxItems = paginationItems > 0 ? paginationItems : 1
    setMaxItems(maxItems)
  }

  const clearFilters = () => {
    setAssignee(undefined)
    setStatus(undefined)
    setPriority(undefined)
    resetTaskList()
  }

  const resetTaskList = () => {
    let onlyActive = tasks.filter(task => (task.status !== 'completed' && task.status !== 'cancelled'))
    setPaginationItems(onlyActive)
    setTaskList(onlyActive)
    setActivePage(1)
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
        maxItems={maxItems}
        clearFilters={clearFilters}
        assignee={assignee}
        status={status}
        toggleCompleted={showHideCompleted}
        hideCompleted={hideCompleted}
        activePage={activePage}
        setActivePage={setActivePage}
        priority={priority}
        setAssignee={setAssignee}
        setPriority={setPriority}
        setStatus={setStatus}
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
