import React, { useState, useEffect } from 'react'
import './UpdateProfile.css'
import { Avatar, Typography, Button } from '@mui/material';
import { useAlert } from 'react-alert'
import {loadUser, updateProfile} from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader'

const UpdateProfile = () => {
    
    const {loading, error, user} = useSelector(state=> state.user);
    const {loading:updateLoading, error:updateError, message} = useSelector(state=>state.like)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);


    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e)=>{
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = ()=>{
            if(Reader.readyState===2){
                setAvatar(Reader.result);
                setAvatarPreview(Reader.result);
            }
        }
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
    }

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"})
        }

        if(updateError){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"});
        }

    },[dispatch, alert, error, updateError, message])



    return (
        loading ? <Loader/> :<div className='updateProfile'>
        <form action="" className="updateProfileForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>

            <Avatar src={avatarPreview} alt="user" sx={{height:"10vmax", width:"10vmax"}}/>

            <input type="file" accept='image/*' onChange={handleImageChange}/>

            <input className='updateProfileInputs' type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />

            <input className='updateProfileInputs' type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />



            <Button disabled={updateLoading} type='submit' >Update</Button>

        </form>
    </div>
    )
}

export default UpdateProfile