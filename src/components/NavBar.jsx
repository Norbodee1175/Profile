import React from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate, NavLink } from 'react-router-dom'
import { CheckUser } from './CheckUser'
import '../css/NavBar.css'
import userpic from '../image/user.png'
import engineer from '../image/engineer.png'

export const NavBar = () => {

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();
    navigate('/Login');
  }

  const getUsername = localStorage.getItem('Username')
  const getRoles = localStorage.getItem('Roles')

  return (
    <>
      <CheckUser/>
      <Nav>
        <div className='nav'>
          <ul>
              <br/><li><img src={engineer} alt="engineer" width="100%"></img></li><br/>
              <li><NavLink to = '/' activeclassname="active">Home</NavLink></li>
              <li className='dropdown'>
                <a className='inputbtn'>Resume</a>
                <div className='dropdown-input'>
                {
                  getRoles == 'Emperors' || getRoles == 'Warlords' ? 
                    <NavLink to = '/Personal' activeclassname="active">Personal</NavLink>
                  : null
                }
                {
                  getRoles == 'Emperors' || getRoles == 'Rookies' ? 
                  <>
                    <NavLink to = '/Education' activeclassname="active">Education</NavLink>
                    <NavLink to = '/Profile' activeclassname="active">Profile</NavLink>
                  </>
                  : null
                }
                {
                  getRoles == 'Emperors' || getRoles == 'Warlords' ? 
                    <NavLink to = '/Experience' activeclassname="active">Experience</NavLink>
                  : null
                }
                </div>
              </li>
              {
                getRoles == 'Emperors' ? 
                <li><NavLink to = '/AdminProfile' activeclassname="active">Admin Profile</NavLink></li>
                : null
              }
              <li><NavLink to = '/Dashboard' activeclassname="active">Dashboard</NavLink></li>
              <li><NavLink to = '/Report' activeclassname="active">Report Table</NavLink></li>
              {
                getRoles == 'Emperors' ? 
                <li className='dropdown'>
                  <a className='inputbtn'>Mini Game</a>
                  <div className='dropdown-input'>
                    <li><NavLink to = '/MemoryGame' activeclassname="active">Memory Game</NavLink></li>
                    <li><NavLink to = '/MineSweeper' activeclassname="active">Mine Sweeper</NavLink></li>
                  </div>
                </li>
                : null
              }
          </ul>
        </div>
      </Nav>
        <img className='userpic' src={userpic} alt='username'></img>
        <div className='dropdown-user'>
          <button className='userbtn'>{getUsername}</button>
          <button className='dropdown-logout' onClick={logout}>Logout</button>
        </div>
    </>
  )
}