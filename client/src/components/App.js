import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Loadable from "react-loadable"
import { BounceLoader } from "react-spinners"
import 'bootstrap/dist/css/bootstrap.min.css';

import { getCoaches, getTasks } from '../services/dbQueries'
import Nav from '../components/navbar/Navbar'
import Home from '../views/Home'
import OngoingProjects from '../views/OngoingProjects'
import CoachProfile from '../views/CoachProfile'
import TaskView from '../views/TaskView'
import Login from '../views/Login'
import Admin from '../views/Admin'
import { AuthProvider } from '../auth/Auth'
import PrivateRoute from '../auth/PrivateRoute'

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
            <Nav />
            <>
              <PrivateRoute
                path="/"
                exact
                component={Home}
                getTasks={this.getTasksCall}
              />
              <PrivateRoute
                path="/ongoing"
                component={OngoingProjects}
              />
              <PrivateRoute
                path="/profile/:name"
                component={CoachProfile}
              />
              <PrivateRoute
                path="/task/:title"
                component={TaskView}
                userLoggedIn={user}
              />
              <Route
                path="/login"
                exact
                component={Login}
                setCoach={this.setCoach}
              />
              <PrivateRoute
                path="/admin"
                exact
                component={Admin}
                coaches={coaches}
                getCoaches={this.getCoachesCall}
              />
              <PrivateRoute
                path="/nps"
                exact
                component={LoadableNPS}
              />
              <PrivateRoute
                path="/calendar"
                exact
                component={LoadableCalendar}
                tasks={tasks}
              />
            </>
          </BrowserRouter>
        </AuthProvider>
      </>
    )
  }
}

export default App;
