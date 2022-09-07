import React, { useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getUserRepositories } from '../services/UserServices'

const Repositories = () => {
    const { username } = useParams();
    const [sort, setsort] = useState("updated"); //updated, created, pushed
    const [direction, setdirection] = useState("asc"); //asc desc
    const [per_page, setper_page] = useState(6);
    const [page, setpage] = useState(1);
    const [totalcount, settotalcount] = useState(0)
    const { data: repositories, isError, isLoading } = useQuery(["repositories", username,sort,direction,per_page,page], ()=> getUserRepositories(username,sort,direction,per_page,page))
    if(isError) return <h1>An error was occured</h1>
    if(isLoading) return <h1>please wait data loading</h1>
    console.log(repositories);
    return (
    <div className='mx-2 w-full border rounded-xl p-2'>
        <div className="grid grid-cols-3">
            <form>
                <select onChange={(e)=> setdirection(e.target.value)} defaultValue={direction}>
                    <option value={"asc"}>asc</option>
                    <option value={"desc"}>desc</option>
                </select>
            </form>
            <form>
                <select onChange={(e)=> setsort(e.target.value)} defaultValue={sort}>
                    <option value={"updated"}>updated</option>
                    <option value={"created"}>created</option>
                    <option value={"pushed"}>pushed</option>
                </select>
            </form>
            <form>
                <select onChange={(e)=> setper_page(e.target.value)} defaultValue={per_page}>
                    <option value={"6"}>6</option>
                    <option value={"13"}>13</option>
                    <option value={"33"}>33</option>
                    <option value={"66"}>66</option>
                    <option value={"77"}>77</option>
                    <option value={"88"}>88</option>
                    <option value={"100"}>100</option>
                </select>
            </form>
        </div>
        {
            repositories.map((repository)=>(
                <div key={repository.id} className="border my-2 p-2">
                    <div className="flex space-x-1 items-center">
                        <FaBook/>
                        <h1 className='text-lg font-medium text-gray-900'>{repository.name}</h1>
                    </div>
                    <h1 className='text-slate-700'>{repository.description}</h1>
                    <span className='bg-slate-200 rounded-lg px-2 py-1'>{repository.visibility}</span>
                </div>
            ))
        }
        <div className="flex">
            { page> 1 && <button className='border w-20 h-8 bg-slate-700 rounded text-md text-white' onClick={()=> setpage((prevPage)=> prevPage - 1)}>previous</button>}
            { totalcount != 0 && <button className='border w-20 h-8 bg-slate-700 rounded text-md text-white' onClick={()=> setpage((prevPage)=> prevPage + 1)}>next</button>}
        </div>
    </div>
  )
}

export default Repositories