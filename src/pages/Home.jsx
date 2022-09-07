import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import User from '../components/User';
import { getAllUsersByLocation } from '../services/SearchServices';
import countryList from '../utils/countries';

const Home = () => {
    const [countries, setCountries] = useState(countryList());
    const [location, setLocation] = useState("Madagascar");
    const [username, setUsername] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("joined");
    const [order, setorder] = useState("desc");
    const [per_page, setPerPage] = useState(10);
    const [totalCount, settotalCount] = useState(0);
    const [isCompleteResult, setIsCompleteResults] = useState(false);
    const [users, setUsers] = useState([]);

    const queryClient = useQueryClient();
    const { data , error, isLoading } = useQuery(["users", username, location, sort, per_page,page,order], 
        ()=>getAllUsersByLocation(username, location, sort, per_page,page,order),{
            onSuccess: (result)=>{
                setUsers(result.items);
                settotalCount(result.total_count);
                setIsCompleteResults(result.incomplete_results);
                
            },
            onError: ()=>{
                console.log("An Error was occured");
            },
        }
    );

    const handleSubmit = (e)=>{
        e.preventDefault();
        setUsername(e.target.username.value);
        setPage(1);
        queryClient.invalidateQueries("users");
    }
    
    if(error) return <h1>an error was occured</h1>
    if(isLoading) return <h1>loading data ... please wait</h1>
  return (
    <div>
        <h1 className='text-xl'>Filter</h1>
        <div className='mb-2 flex flex-col md:flex-row lg:space-x-8'>
            <form className='flex flex-col md:flex-row'>
                <label className='w-32'>location</label>
                <select className='border' onChange={(e)=> {setLocation(e.target.value); setUsername("")}} defaultValue={location}>
                    {
                        countries.map((country)=>(
                            <option key={country.name} value={country.name}> {country.name} </option>
                        ))
                    }
                </select>
            </form>
            <form className='flex flex-col md:flex-row' onSubmit={handleSubmit}>
                <label htmlFor='username' className='w-32'>username</label>
                <input type="text" className='border' name='username' id='username' placeholder='search username'/>
                <div className='flex items-center bg-slate-900 rounded w-16 text-white p-1 mx-1'>
                    <button type='submit'>Search</button>
                </div>
            </form>
        </div>
        <div className='flex justify-between items-center'>
            <div className='flex justify-start space-x-3 items-center'>
                <h1> page {page} / { Math.round(totalCount / per_page) }</h1>
                <div>
                    <form>
                        <select onChange={(e)=> setPerPage(e.target.value)} defaultValue={per_page}>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={60}>60</option>
                        </select>
                    </form>
                </div>
                <div>
                    <form>
                        <select onChange={(e)=> setorder(e.target.value)} defaultValue={order}>
                            <option value={"asc"}>asc</option>
                            <option value={"desc"}>desc</option>
                        </select>
                    </form>
                </div>
                <div>
                    <form>
                        <select onChange={(e)=> setSort(e.target.value)} defaultValue={sort}>
                            <option value={"joined"}>joined</option>
                            <option value={"followers"}>followers</option>
                            <option value={"repositories"}>repositories</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className='flex justify-end space-x-3'>
                { page > 1 && <button className='border w-20 h-8 bg-slate-700 rounded text-md text-white' onClick={()=> setPage((prevPage)=> prevPage - 1)}>previous</button>}
                { (totalCount > per_page) && <button className='border w-20 h-8 bg-slate-700 rounded text-md text-white' onClick={()=> setPage((prevPage)=> prevPage + 1)}>next</button>}
            </div>
        </div>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {
                users.map((user)=>(
                    <User key={user.id} user={user}/>
                ))
            }
        </div>

    </div>
  )
}

export default Home