import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Loadable from "react-loadable"
import { BounceLoader } from "react-spinners"
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../components/navbar/Navbar'
import Home from '../views/Home'
import OngoingProjects from '../views/OngoingProjects'
import CoachProfile from '../views/CoachProfile'
import TaskView from '../views/TaskView'
import Login from '../views/Login'
import Admin from '../views/Admin'
import { AuthProvider } from '../connectors/auth/Auth'
import { TasksProvider } from '../connectors/tasks'
import PrivateRoute from '../connectors/auth/PrivateRoute'

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

  render () {
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
              />
              <PrivateRoute path="/ongoing">
                <TasksProvider>
                  <OngoingProjects />
                </TasksProvider>
              </PrivateRoute>
              <PrivateRoute
                path="/profile/:name"
                component={CoachProfile}
              />
              <PrivateRoute
                path="/task/:title"
                component={TaskView}
              />
              <Route
                path="/login"
                exact
                component={Login}
              />
              <PrivateRoute
                path="/admin">
                <TasksProvider>
                  <Admin/>
                </TasksProvider>
              </PrivateRoute>
              <PrivateRoute
                path="/nps"
                exact
                component={LoadableNPS}
              />
              <PrivateRoute
                path="/calendar"
                exact>
                <TasksProvider>
                  <LoadableCalendar />
                </TasksProvider>
              </PrivateRoute>
            </>
          </BrowserRouter>
        </AuthProvider>
      </>
    )
  }
}

export default App;
