import React from 'react';
import { NavLink } from 'react-router-dom';
const User = ({user}) => {
  return (
    <div className='flex flex-col p-2 rounded-x shadow-xl mb-2'>
        <img className='shadow-2xl rounded h-64' src={user.avatar_url} alt="user"/>
        <h1 className='text-xl font-medium'>{user.login}</h1>
        <h1 className='text-xl text-gray-500'>{user.name}</h1>
        <NavLink to={`profile/${user.login}`}>
          <button className='rounded bg-slate-900 text-white p-1 w-1/4 hover:bg-slate-500'>view</button>
        </NavLink>
    </div>
  )
}

export default User