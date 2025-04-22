import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className='content-container flex'>
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Content
