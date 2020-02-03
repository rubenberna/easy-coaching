import React, { Component } from 'react';

import { getActiveTasks, getTasks } from '../modules/dbQueries'
import AdminPanel from '../components/panel/AdminPanel'
import NewCoachForm from '../components/forms/NewCoach'
import { AddProfileBtn, AdminBtn } from '../components/buttons/FloatingButtons'

export default class Admin extends Component {
  state = {
    view: 'edit',
    activeTasks: [],
    allTasks: []
  }

  async componentDidMount() {
    const active = await getActiveTasks()
    const all = await getTasks()
    this.setState({ activeTasks: active, allTasks: all })
  }

  renderViews = () => {
    const {view, activeTasks, allTasks} = this.state
    if(view === 'edit') return <AdminPanel coaches={this.props.coaches} activeTasks={activeTasks} allTasks={allTasks} getCoaches={this.props.getCoaches}/>
    else return <NewCoachForm getCoaches={this.props.getCoaches}/>
  }

  setView = (name) => {
    this.setState({ view: name })
  }

  renderButtons = () => {
    const { view } = this.state
    if (view === 'edit') return <AddProfileBtn setView={this.setView} />
    else return <AdminBtn setView={this.setView} />
  }

  render() {
    return (
      <div className='admin'>
        { this.renderViews() }
        { this.renderButtons() }
      </div>
    )
  }
}
