import React, { useState, useEffect } from 'react'
import './UpdatePassword.css'
import { Typography, Button } from '@mui/material';
import { useAlert } from 'react-alert'
import { updatePassword} from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader'

const UpdatePassword = () => {
    
    const {loading, error, message} = useSelector((state)=> state.user);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const dispatch = useDispatch();
    const alert = useAlert();

   

    const submitHandler = async(e)=>{
        e.preventDefault();
        dispatch(updatePassword(oldPassword,newPassword));
    }

    useEffect(()=>{

        if(error){
            console.log("galat hai")
            alert.error(error);
            dispatch({type:"clearError"})
        }

        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"});
        }

    },[dispatch, alert, error, message])



    return (
        loading ? <Loader/> :<div className='updatePassword'>
        <form action="" className="updatePasswordForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>


            <input className='updatePasswordInputs' type="password" placeholder='Enter Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            <input className='updatePasswordInputs' type="password" placeholder='Enter New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

            <Button disabled={loading} type='submit' >Update</Button>

        </form>
    </div>
    )
}

export default UpdatePassword