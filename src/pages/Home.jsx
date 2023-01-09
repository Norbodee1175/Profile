import React from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import '../css/Home.css'
import Win from '../image/Me/Me6.jpg'
import Social from '../image/4Pages/Social media.png'
import Education from '../image/4Pages/Education.png'
import Profile from '../image/4Pages/Profile.png'
import Experience from '../image/4Pages/Experience.png'

export const Home = () => {

    const getRoles = localStorage.getItem('Roles')

    return (
        <>
            <NavBar/>
            <div className='bodyhome'>
                <div className='headhome'>
                    <img src={Win} alt="Win" width="170px"></img>
                    <br/><br/>
                    <p>Portfolio</p>
                </div>
                {
                    getRoles == 'Emperors' ? 
                    <div className='page1'>
                        <Link to = 'Personal' className='pages'>Personal Information</Link>
                        <br/><br/>
                        <img src={Social} alt="Social" width="70px"></img>
                    </div>
                    : null
                }
                {
                    getRoles == 'Warlords' ? 
                    <div className='page5'>
                        <Link to = 'Personal' className='pages'>Personal Information</Link>
                        <br/><br/>
                        <img src={Social} alt="Social" width="70px"></img>
                    </div>
                    : null
                }
                {
                    getRoles == 'Emperors' || getRoles == 'Rookies' ? 
                    <>
                    <div className='page2'>
                        <Link to = 'Education' className='pages'>Education Information</Link>
                        <br/><br/>
                        <img src={Education} alt="Education" width="70px"></img>
                    </div>
                    <div className='page3'>
                        <Link to = 'Profile' className='pages'>Resume Profile</Link>
                        <br/><br/>
                        <img src={Profile} alt="Profile" width="70px"></img>
                    </div>
                    </>
                    : null
                }
                {
                    getRoles == 'Emperors' ? 
                    <div className='page4'>
                        <Link to = 'Experience' className='pages'>Work Experience</Link>
                        <br/><br/>
                        <img src={Experience} alt="Experience" width="70px"></img>
                    </div>
                    : null
                }
                {
                    getRoles == 'Warlords' ? 
                    <div className='page6'>
                        <Link to = 'Experience' className='pages'>Work Experience</Link>
                        <br/><br/>
                        <img src={Experience} alt="Experience" width="70px"></img>
                    </div>
                    : null
                }
            </div>
            <Footer/>
        </>
    )
}