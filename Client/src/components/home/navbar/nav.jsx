import React from 'react'
import logo from '../../images/logo.png'
import { Link} from 'react-router-dom';
import './nav.css'
const NavBar = () => {
  return (
    <nav className='nav' id="nav">
      <div>
          <img src={logo} alt="logo" className="logo" />
      </div>
        <div className='buttons'>
          <Link to="/login" className="login"> Login</Link>
        </div>
    </nav>
  )
}

export default NavBar