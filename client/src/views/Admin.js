import React, { Component } from 'react';

import AdminPanel from '../components/panel/AdminPanel'
import CreateUserContainer from '../components/forms/createUser/CreateUserContainer'
import { AddProfileBtn, AdminBtn } from '../components/buttons/FloatingButtons'

export default class Admin extends Component {
  state = {
    view: 'edit',
  }

  renderViews = () => {
    if (this.state.view === 'edit') return <AdminPanel/>
    else return <CreateUserContainer />
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
