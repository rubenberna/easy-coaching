import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Loadable from "react-loadable"
import { BounceLoader } from "react-spinners"
import 'bootstrap/dist/css/bootstrap.min.css';

import { getCoaches, getTasks } from '../modules/dbQueries'
import Nav from '../components/navbar/Navbar'
import Home from '../views/Home'
import OngoingProjects from '../views/OngoingProjects'
import CoachProfile from '../views/CoachProfile'
import TaskView from '../views/TaskView'
import Login from '../views/Login'
import Admin from '../views/Admin'
import { AuthProvider } from './auth/Auth'
import PrivateRoute from './auth/PrivateRoute'

const LoadableCalendar = Loadable({
  loader: () => import("../views/Calendar"),
  loading() {
    return <BounceLoader sizeUnit={"px"} size={150} color={"#00796b"} />;
  }
});

const LoadableNPS = Loadable({
  loader: () => import("../views/NPS"),
  loading() {
    return <BounceLoader sizeUnit={"px"} size={150} color={"#00796b"} />;
  }
});

class App extends Component {
  state = {
    coaches: [],
    tasks: [],
    user: JSON.parse(localStorage.getItem('user')),
  }

  componentDidMount() {
    this.getCoachesCall()
    this.getTasksCall()
  }

  getCoachesCall = async () => {
    const coaches = await getCoaches()
    this.setState({ coaches })
  }

  getTasksCall = async () => {
    const tasks = await getTasks()
    this.setState({ tasks })
  }

  setCoach = (coach) => {
    localStorage.setItem('user', JSON.stringify(coach))
    this.setState({ user: coach })
  }

  logoutUser = () => {
    localStorage.removeItem('user')
    this.setState({
      user: null
    })
  }

  render () {
    const { user, coaches, tasks } = this.state
    return (
      <>
        <AuthProvider>
          <BrowserRouter>
            <Nav user={user} logout={this.logoutUser}/>
            <>
              <PrivateRoute
                path="/"
                exact
                component={Home}
                coaches={coaches}
                getTasks={this.getTasks}
              />
              <Route
                path="/ongoing"
                render={props => <OngoingProjects {...props} coaches={coaches} />}
              />
              <Route
                path="/profile/:name"
                component={CoachProfile}
              />
              <Route
                path="/task/:title"
                render={props => <TaskView {...props} userLoggedIn={user} coaches={coaches} />}
              />
              <Route
                path="/login"
                exact
                render={props => <Login {...props} coaches={coaches} setCoach={this.setCoach}/>}
              />
              <Route
                path="/admin"
                exact
                render={props => <Admin {...props} coaches={coaches} getCoaches={this.getCoachesCall}/>}
              />
              <Route
                path="/nps"
                exact
                render={props => <LoadableNPS />}
              />
              <Route
                path="/calendar"
                exact
                render={props => <LoadableCalendar {...props} coaches={coaches} user={user} tasks={tasks}/>}
              />
            </>
          </BrowserRouter>
        </AuthProvider>
      </>
    )
  }
}

export default App;
