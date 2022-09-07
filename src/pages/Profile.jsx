import React from 'react';
import Repositories from '../components/Repositories';
import UserCard from '../components/UserCard';


const Profile = () => {
  
  return (
    <div className='flex flex-col md:flex-row'>
      <UserCard/>
      <Repositories/>
    </div>
  )
}

export default Profile