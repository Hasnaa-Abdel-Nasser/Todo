import React from 'react'
import './header.css'
import Lottie from 'lottie-react';
import calendar from '../../images/calendar.json'
import girl from '../../images/girl.json'
import background from '../../images/background-animation.json'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <div className="header-text">
        <h1>Your everyday <br/><span>tasks,</span> automated.</h1>
        <p>todo lets you design and streamline everyday tasks and workflows in just a few clicks.</p>
        <Link to='/login'>Get Started</Link>        
      </div>
      <div className='calendar'>
        <Lottie animationData={calendar}/>
      </div>
      <div className='girl-header'>
      <Lottie animationData={girl}/>
      </div>
      <div className='background-circle'>
      <Lottie animationData={background}/>
      </div>
    </header>
  )
}

export default Header