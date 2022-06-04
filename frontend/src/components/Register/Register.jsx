import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Register.css'
import { Avatar, Typography, Button } from '@mui/material';
import { useAlert } from 'react-alert'
import {RegisterUser} from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);

    const {loading, error} = useSelector(state=> state.user);

    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e)=>{
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = ()=>{
            if(Reader.readyState===2){
                setAvatar(Reader.result);
            }
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(RegisterUser(name, email, avatar, password));
        
    }

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch({type:"clearError"})
        }

    },[dispatch, alert, error])



    return (
        <div className='register'>
            <form action="" className="registerForm" onSubmit={submitHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>

                <Avatar src={avatar} alt="user" sx={{height:"10vmax", width:"10vmax"}}/>

                <input type="file" accept='image/*' onChange={handleImageChange}/>

                <input className='registerInputs' type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />

                <input className='registerInputs' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                <input className='registerInputs' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                <input className='registerInputs' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                {
                    confirmPassword.length>0 && confirmPassword!==password ? <Typography variant="h6" style={{ color:"red" }}>Password must be same!</Typography>: null
                }


                <Link to ="/">
                <Typography>Already Sign up? Login Now</Typography>
            </Link>

                <Button disabled={loading} type='submit' >Sign Up</Button>

            </form>
        </div>
    )
}

export default Register