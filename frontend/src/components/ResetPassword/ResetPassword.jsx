import React, {useState, useEffect} from 'react'
import {Typography, Button} from '@mui/material'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import './ResetPassword.css'
import { resetPassword } from '../../Actions/User'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'

const ResetPassword = () => {

    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {error, message, loading} = useSelector((state)=>state.user);

    const alert = useAlert();
    const params = useParams();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(resetPassword(params.token, password));
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
    <div className='resetPassword'>
        <form action="" className="resetPasswordForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{padding:"2vmax"}}>Social App</Typography>

            <input className='resetPasswordInputs' type="password" placeholder='New Password'  value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            <Button disabled={loading} type='submit'>Reset Password</Button>

            <Link to={"/forgot/password"}>
                <Typography>Request another link</Typography>
            </Link>

        </form>
    </div>
  )
}

export default ResetPassword