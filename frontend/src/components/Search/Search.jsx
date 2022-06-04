import { Button, Typography } from '@mui/material'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';
import './Search.css'

const Search = () => {

    const [name, setName] = useState('');

    const {users, loading} = useSelector(state => state.allUsers);

    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(getAllUsers(name));
    }

  return (
    <div className='search'>
        <form action="" className="searchForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{ padding: "2vmax" }}>Search</Typography>


            <input  type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />

            <Button disabled={loading}  type='submit' >Search</Button>

        <div className='searchResult'>
            {
                users && users.map(user => (
                    <User 
                        key={user.id}
                        name={user.name}
                        avatar={user.avatar.url}
                    />
                ))
            }
        </div>
        </form>

    </div>
  )
}

export default Search