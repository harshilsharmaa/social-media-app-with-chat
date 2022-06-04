import React from 'react'
import './NotFound.css'
import {Typography} from '@mui/material'
import {ErrorOutline} from '@mui/icons-material'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notFound'>
        <div className="notFoundContainer">
            <ErrorOutline/>
            <Typography variant="h2" style={{padding:"2vmax"}}>404 Page Not Found</Typography>

            <Link to="/">
                <Typography variant="h5">Go Home</Typography>
            </Link>
        </div>
    </div>
  )
}

export default NotFound