import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'

import Chart from '../charts/PieChart'
import EditCoach from '../forms/EditCoach'

class AdminPanel extends Component {

  state = {
    editProfile: false,
    currCoach: null
  }

  renderNotStarted = coach => {
    const { allTasks } = this.props
    const count = allTasks.filter(t => (t.assignee === coach.name && t.status === 'not started'))
    return count.length
  }

  renderPlanned = coach => {
    const { allTasks } = this.props
    const count = allTasks.filter(t => (t.assignee === coach.name && t.status === 'planned'))
    return count.length
  }

  renderFeedbackCall = coach => {
    const { allTasks } = this.props
    const count = allTasks.filter(t => (t.assignee === coach.name && t.status === 'feedback call'))
    return count.length
  }

  renderCompleted = coach => {
    const { allTasks } = this.props
    const count = allTasks.filter(t => (t.assignee === coach.name && t.status === 'completed'))
    return count.length
  }

  toggleEditProfile = (coach) => {
    this.setState({ editProfile: !this.state.editProfile, currCoach: coach })
  }

  renderAccordion = () => {
    const { coaches } = this.props
    const { editProfile } = this.state
    return coaches.map((coach, i) => {
      return (
        <CollapsibleItem
          key={i}
          expanded={false}
          header={coach.name}
          icon={<Icon>person_outlined</Icon>}
          node="div"
        >
          <div className='admin-stats-body'>
            <h5 style={{ fontWeight: 500 }}>Stats</h5>
            <p><span>Not started:</span><span> {this.renderNotStarted(coach)}</span></p>
            <p><span>Planned:</span><span></span> {this.renderPlanned(coach)}</p>
            <p><span>Feedback call:</span><span> {this.renderFeedbackCall(coach)}</span></p>
            <p><span>Completed:</span><span> {this.renderCompleted(coach)}</span></p>
            <span className='admin-stats-body-edit' onClick={ e => this.toggleEditProfile(coach) }>{ !editProfile ? 'Edit profile' : 'Close edit'}</span>
          </div>
        </CollapsibleItem>
      )
    })
  }

  conditionalRender = () => {
    const { editProfile, currCoach } = this.state
    if (editProfile) {
      return <EditCoach coach={currCoach} getCoaches={this.props.getCoaches}/>
    } else {
      return (
        <>
        <h3>General view</h3>
          <Chart tasks={this.props.allTasks}/>
        </>
      )
    }
  }

  render () {
    return (
      <div className="container admin-panel">
        <div className='admin-panel-coaches'>
          <h3>Coach view</h3>
          <Collapsible accordion>
          {this.renderAccordion()}
          </Collapsible>
        </div>
        <div className='admin-panel-general'>
          { this.conditionalRender() }
        </div>
      </div>
    )
  }
}

export default withRouter(AdminPanel)
