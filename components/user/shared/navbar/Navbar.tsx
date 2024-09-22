import React from 'react'
import Logo from './Logo'
import Links from './Links'
import Icons from './Icons'


const Navbar = () => {
  return (
    <div className=' bg-white flex justify-between wrapper'>
      <Logo />
      <Links />
      <Icons />
      
    </div>
  )
}

export default Navbar