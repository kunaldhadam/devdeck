import React from 'react'

function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-lg h-16 w-full flex justify-between items-center px-4 ">
        <div className="navbar-start">
            <div className="logo"></div>
        </div>
        <div className="navbar-center">
            <ul className="menu menu-horizontal p-0 flex items-center space-x-14 text-lg text-white">
            <li><a href="#/">Home</a></li>
                <li><a href="#/about-me">About Me</a></li>
                <li><a href="#/">Portfolio</a></li>
                <li><a href="#/">Blog</a></li>
                <li><a href="#/">Contact</a></li>
            </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </>
  )
}

export default Navbar
