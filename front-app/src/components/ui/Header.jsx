import React from 'react'
import logo from '../../assets/Tabletopia.png'
import "../../templates/css/Header.css"
function Header() {
  return (
    <header>
    <a><img className='logo' src={logo}></img></a>
    <a><img></img></a>
    </header>

  )
}

export default Header