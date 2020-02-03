import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'

class Login extends Component {

  state = {
    wrongCredentials: false,
    user: ''
  }

  validateUser = (user) => {
    const { coaches, history, setCoach } = this.props
    const coach = coaches.find( coach => coach.email.toLowerCase() === user.email.toLowerCase() )
    if (!coach) this.setState({ wrongCredentials: true })
    else {
      if ( coach.password !== user.password ) {
        this.setState({
          wrongCredentials: true
        })
      } else {
        setCoach(coach)
        history.push('/')
      }
    }

  }

  render() {
    return(
      <div className='login'>
        {this.state.wrongCredentials && <h6 className='wrong'>Wrong credentials</h6>}
        <LoginForm
          validate={ this.validateUser }
          wrongCredentials={this.state.wrongCredentials}/>
      </div>
    )
  }
}

export default withRouter(Login);
