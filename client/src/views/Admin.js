import React, { Component } from 'react';

import { getTasks } from '../services/dbQueries'
import AdminPanel from '../components/panel/AdminPanel'
import CreateUserContainer from '../components/forms/createUser/CreateUserContainer'
import { AddProfileBtn, AdminBtn } from '../components/buttons/FloatingButtons'

export default class Admin extends Component {
  state = {
    view: 'edit',
    allTasks: []
  }

  async componentDidMount() {
    const all = await getTasks()
    this.setState({ allTasks: all })
  }

  renderViews = () => {
    const {view, allTasks} = this.state
    if(view === 'edit') return <AdminPanel coaches={this.props.coaches} allTasks={allTasks} getCoaches={this.props.getCoaches}/>
    else return <CreateUserContainer getCoaches={this.props.getCoaches}/>
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
