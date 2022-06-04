import React from 'react'
import {Typography} from '@mui/material'
import {Link} from 'react-router-dom'

const User = ({userId, name, avatar, link}) => {
  return (
    <Link to={link?`/messanger/${userId}`:`/user/${userId}`} className='homeUser'>
        
        <img src={avatar} alt={name} />
        <Typography>{name}</Typography>
    </Link>
  )
}

export default User