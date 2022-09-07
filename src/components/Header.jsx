import React from 'react'
import { AiFillGithub } from "react-icons/ai"
import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div className=' bg-slate-900 text-white items-center p-4'>
      <NavLink to={"/"} className="flex items-center">
        <AiFillGithub/>
        <h1>AITI-hub</h1>
      </NavLink>
    </div>
  )
}

export default Header