import React, { Component } from 'react'

import './views.scss'
import { getTasks } from '../modules/dbQueries'
import TableTasks from '../components/tables/Table'

class OngoingProjects extends Component {
  state = {
    tasks: [],
    assignee: undefined,
    status: undefined,
    priority: undefined,
    taskList: [],
    maxItems: null,
    hideCompleted: true,
    activePage: 1
  }

  async componentDidMount() {
    const tasks = await getTasks()
    let onlyActive = tasks.filter(task => (task.status !== 'completed' && task.status !== 'cancelled'))
    let paginationItems = Math.floor(tasks.length / 10)
    this.setState({
      tasks,
      taskList: onlyActive.sort((a, b) => (a.start > b.start) ? 1 : -1),
      maxItems: paginationItems > 0 ? paginationItems : 1
    })
  }

  changeTaskList = () => {
    const { tasks, status, assignee, priority } = this.state
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
    this.setState({
      taskList: newList.sort((a, b) => (a.start > b.start) ? 1 : -1),
      maxItems: paginationItems > 0 ? paginationItems : 1,
      activePage: 1
    })
  }

  setFilter = async filter => {
    await this.setState({...filter})
    this.changeTaskList()
  }

  clearFilters = async () => {
    await this.setState({
      assignee: undefined,
      status: undefined
    })
    this.changeTaskList()
  }

  showHideCompleted = async () => {
    let newList = []
    await this.setState({ hideCompleted: !this.state.hideCompleted })
    if (!this.state.hideCompleted) {
      newList = this.state.tasks.filter(task => (task.status === 'completed' || task.status === 'cancelled'))
    } else newList = this.state.tasks.filter(task => (task.status !== 'completed' && task.status !== 'cancelled'))
    this.setState({
      taskList: newList,
      activePage: 1
    })
  }

  setActivePage = nr => {
    this.setState({ activePage: nr})
  }

  render() {
    return(
      <div className='ongoing-projects'>
        <h2>Ongoing Visits</h2>
        <TableTasks
          list={this.state.tasks}
          taskList={this.state.taskList}
          coaches={this.props.coaches}
          changeTaskList={this.changeTaskList}
          setFilter={this.setFilter}
          maxItems={this.state.maxItems}
          clearFilters={this.clearFilters}
          assignee={this.state.assignee}
          status={this.state.status}
          toggleCompleted={this.showHideCompleted}
          hideCompleted={this.state.hideCompleted}
          activePage={this.state.activePage}
          setActivePage={this.setActivePage}
          priority={this.state.priority}
        />
      </div>
    )
  }
}

export default OngoingProjects;
