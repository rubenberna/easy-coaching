import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'
import logo from '../../assets/logo.svg'

import './navbar.scss'

class Nav extends Component {

  renderOption = () => {
    const { user } = this.props
    if(!user) return <Link to='/login'>Login</Link>
    else return <NavItem onClick={ this.props.logout }>Logout</NavItem>
  }

  renderDevPhoto = () => {
    const { user } = this.props
    if(user) return (
      <Link className='navbar-photo' to={`/profile/${user.name}`}>
        <img alt={ user.name } src={ user.photo } />
      </Link>
    )
  }

  renderAdminLink = () => {
    const { user } = this.props
    if (user && user.admin) return (
      <Link to='/admin'>
        Admin
      </Link>
    )
  }

  render() {
    return(
      <Navbar brand={<Link to='/'><img src={logo} alt="Logo" className="logo"/><span>Coaching</span></Link>} alignLinks="right">
        { this.renderDevPhoto() }
        { this.renderAdminLink() }
        <Link to='/calendar'>
          Calendar
        </Link>
        <Link to='/ongoing'>
          Ongoing visits
        </Link>
        {this.renderOption()}
      </Navbar>
    )
  }
}

export default Nav;
