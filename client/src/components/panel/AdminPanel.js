import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom'
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'

import { AuthContext } from '../../connectors/auth/Auth'
import { TasksContext } from '../../connectors/tasks'
import Chart from '../charts/PieChart'
import EditCoach from '../forms/EditCoach'

const AdminPanel = () => {
  const [editProfile, setEditProfile ] = useState(false)
  const [currCoach, setCurrCoach ] = useState('')
  const { tasks } = useContext(TasksContext)
  const { coaches } = useContext(AuthContext)

  const renderNotStarted = coach => {
    const count = tasks.filter(t => (t.assignee === coach.name && t.status === 'not started'))
    return count.length
  }

  const renderPlanned = coach => {
    const count = tasks.filter(t => (t.assignee === coach.name && t.status === 'planned'))
    return count.length
  }

  const renderFeedbackCall = coach => {
    const count = tasks.filter(t => (t.assignee === coach.name && t.status === 'feedback call'))
    return count.length
  }

  const renderCompleted = coach => {
    const count = tasks.filter(t => (t.assignee === coach.name && t.status === 'completed'))
    return count.length
  }

  const toggleEditProfile = (coach) => {
    setEditProfile(!editProfile)
    setCurrCoach(coach)
  }

  const renderAccordion = () => {
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
            <p><span>Not started:</span><span> {renderNotStarted(coach)}</span></p>
            <p><span>Planned:</span><span></span> {renderPlanned(coach)}</p>
            <p><span>Feedback call:</span><span> {renderFeedbackCall(coach)}</span></p>
            <p><span>Completed:</span><span> {renderCompleted(coach)}</span></p>
            <span className='admin-stats-body-edit' onClick={ e => toggleEditProfile(coach) }>{ !editProfile ? 'Edit profile' : 'Close edit'}</span>
          </div>
        </CollapsibleItem>
      )
    })
  }

  const conditionalRender = () => {
    if (editProfile) {
      return <EditCoach coach={currCoach} />
    } else {
      return (
        <>
        <h3>General view</h3>
          <Chart tasks={tasks}/>
        </>
      )
    }
  }

  return (
    <div className="container admin-panel">
      <div className='admin-panel-coaches'>
        <h3>Coach view</h3>
        <Collapsible accordion>
        {renderAccordion()}
        </Collapsible>
      </div>
      <div className='admin-panel-general'>
        { conditionalRender() }
      </div>
    </div>
  )
}

export default withRouter(AdminPanel)
