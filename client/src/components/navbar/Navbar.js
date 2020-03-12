import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'
import { AuthContext } from '../auth/Auth'

import logo from '../../assets/logo.svg'
import firebaseApp from '../../config/firebaseConfig'

import './navbar.scss'

const Nav = (props) => {
  const { currentUser } = useContext(AuthContext)

  const renderOption = () => {
    const { user } = props
    if(!currentUser) return <Link to='/login'>Login</Link>
    else return <NavItem onClick={ () => {props.logout(); firebaseApp.auth().signOut() }}>Logout</NavItem>
  }

  const renderDevPhoto = () => {
    const { user } = props
    if(user) return (
      <Link className='navbar-photo' to={`/profile/${user.name}`}>
        <img alt={ user.name } src={ user.photo } />
      </Link>
    )
  }

  const renderAdminLink = () => {
    const { user } = props
    if (user && user.admin) return (
      <Link to='/admin'>
        Admin
      </Link>
    )
  }

  return(
    <Navbar brand={<Link to='/'><img src={logo} alt="Logo" className="logo"/><span>Coaching</span></Link>} alignLinks="right">
      { renderDevPhoto() }
      { renderAdminLink() }
      <Link to='/calendar'>
        Calendar
      </Link>
      <Link to='/ongoing'>
        Ongoing visits
      </Link>
      {renderOption()}
    </Navbar>
  )
}

export default Nav;

//Sara.troisfontaine@easylifedc.be
//Sara3Fontaine
