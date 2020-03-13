import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { findCoach, findTasksPerCoach } from '../services/dbQueries'

import ProfileCard from '../components/cards/ProfileCard'

class CoachProfile extends Component {

  state = {
    profile: {},
    tasks: []
  }

  getCoachProfile = async () => {
    console.log(this.props.match);
    const coach = this.props.match.params.name
    const [ profile ] = await findCoach(coach)
    this.setState({ profile: profile })
    this.getTasksPerCoach(profile.name)
  }

  getTasksPerCoach = async (name) => {
    let taskList = await findTasksPerCoach(name)
    this.setState({ tasks: taskList })
  }

  componentDidMount() {
    this.getCoachProfile()
  }

  render() {
    return(
      <div className='coach-profile container'>
        <ProfileCard profile={ this.state.profile } taskList={this.state.tasks}/>
      </div>
    )
  }
}

export default withRouter(CoachProfile);
