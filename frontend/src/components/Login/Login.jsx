import React, {useState, useEffect} from 'react'
import "./Login.css"
import {Typography, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../Actions/User'
import {useAlert} from 'react-alert'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const {error, message} = useSelector((state)=>state.user);

    const alert = useAlert();

    const loginHandler = (e)=>{
        e.preventDefault();

        dispatch(loginUser(email, password));
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
    <div className='login'>

        <form action="" className="loginForm" onSubmit={loginHandler}>

            <Typography variant="h3" style={{padding:"2vmax"}}>Social App</Typography>


            <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>

            <input type="password" placeholder='Enter Password'  value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            <Link to ="/forgot/password">
                <Typography>Forgot Password?</Typography>
            </Link>

            <Button type='submit'>Login</Button>

            <Link to ="/register">
                <Typography>Register</Typography>
            </Link>
        </form>


    </div>
  )
}

export default Login