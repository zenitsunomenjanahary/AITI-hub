import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/UserServices';
import { FaLocationArrow,FaUserAlt} from "react-icons/fa"
import { MdWork, MdEmail} from "react-icons/md"
import { GiTrophyCup} from "react-icons/gi"

const UserCard = () => {
    const { username } = useParams();
    const { data: user, isError, isLoading } = useQuery(["user", username],()=> getUser(username));
    if(isError) return <h1>An error was occured</h1>
    if(isLoading) return <h1>please wait data loading</h1>
  return (
    <div className='w-full border rounded-xl p-2 md:w-1/2 lg:w-1/3'>
    <div className='flex items-center justify-around mb-2'>
      <img className='w-40 rounded-full shadow-xl ' src={user.avatar_url} alt="profile"/>
      <div className='flex flex-col'>
        <h1 className='text-xl font-light  text-slate-900'>{user.login}</h1>
        <h1 className='text-xl font-medium text-slate-900'>{user.name}</h1>
      </div>
    </div>
    <p className='text-md text-slate-900 m-2'>{user.bio}</p>
    <div className='grid'>
      {user.email && <div className='flex items-center space-x-2'>
        <MdEmail/>
        <p>{user.email}</p>
      </div>}
      <div className='flex items-center space-x-2'>
        <FaUserAlt/>
        <p>
          {user.followers} followers - {user.following} following
        </p>
      </div>
      <div className='flex items-center space-x-2'>
        <FaLocationArrow/>
        <p>{user.location}</p>
      </div>
      {user.company && <div className='flex items-center space-x-2'>
        <MdWork/>
        <p>{user.company}</p>
      </div>}
      <div className='flex items-center space-x-2'>
        <GiTrophyCup/>
        <p>{user.public_repos} </p> repository
      </div>
    </div>
  </div>
  )
}

export default UserCard