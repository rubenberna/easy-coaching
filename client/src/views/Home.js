import React, { Component } from 'react'

import './views.scss'
import Gallery from '../components/galery/Galery'
import NewTaskForm from '../components/forms/NewTaskForm'

class Home extends Component {
  render() {
    return(
      <div className='home container'>
        <Gallery coaches={this.props.coaches} />
        <NewTaskForm coaches={this.props.coaches} getTasks={this.props.getTasks}/>
      </div>
    )
  }
}

export default Home;
