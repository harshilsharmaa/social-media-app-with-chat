import React, {useState, useEffect} from 'react'
import './ForgotPassword.css'
import {useAlert} from 'react-alert'
import {Button, Typography} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import {forgotPassword} from '../../Actions/User'

const ForgotPassword = () => {


    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const {error, message, loading} = useSelector((state)=>state.user);

    const alert = useAlert();

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type:"clearError"})
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"})
        }
    }, [dispatch, error, message, alert])


  return (
    <div className='forgotPassword'>

    <form action="" className="forgotPasswordForm" onSubmit={submitHandler}>

        <Typography variant="h3" style={{padding:"2vmax"}}>Social App</Typography>


        <input className='forgotPasswordInputs' type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>

        <Button disabled={loading} type='submit'>Verify Email</Button>

    </form>


</div>
  )
}

export default ForgotPassword