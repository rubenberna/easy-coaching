import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'
import { AuthContext } from '../../auth/Auth'

import logo from '../../assets/logo.svg'
import firebaseApp from '../../config/firebaseConfig'

import './navbar.scss'

const Nav = (props) => {
  const { userProfile, dispatch } = useContext(AuthContext)

  const renderOption = () => {
    if(!userProfile) return <Link to='/login'>Login</Link>
    else return <NavItem onClick={ () => { firebaseApp.auth().signOut(); dispatch({type: 'LOGOUT'}) }}>Logout</NavItem>
  }

  const renderDevPhoto = () => {
    if(userProfile) return (
      <Link className='navbar-photo' to={`/profile/${userProfile.name}`}>
        <img alt={ userProfile.name } src={ userProfile.photo } />
      </Link>
    )
  }

  const renderAdminLink = () => {
    if (userProfile && userProfile.admin) return (
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
