import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import User from '../User/User'
import './Account.css'
import { deleteUser, getMyPosts, logoutUser } from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Avatar, Button, Dialog } from '@mui/material'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import { useAlert } from 'react-alert'



const Account = () => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const { user, loading: userLoading, } = useSelector(state => state.user);
    const { loading, error, posts } = useSelector(state => state.myPosts);
    const { error: likeError, message, loading:deleteLoading } = useSelector(state => state.like);

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);    

    const logoutHandler = async () => {
        await dispatch(logoutUser());
        alert.success("Logged out Successfully")
    }

    const deleteHandler = async() => {
        await dispatch(deleteUser());
        dispatch(logoutUser());
        alert.success("Profile Deleted Successfully")
    }


    useEffect(() => {
        dispatch(getMyPosts())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearError" })
        }
        
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" })
        }
    }, [alert, message, error, likeError, dispatch])

    return (
        loading || userLoading === true ? <Loader /> :
            <div className='account'>
                <div className="accountleft">

                    {
                        posts && posts.length > 0 ? posts.map((post) => (
                            <Post

                                key={post._id}

                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerName={post.owner.name}
                                ownerId={post.owner._id}
                                isAccount={true}
                                isDelete={true}
                            />
                        ))
                            : <Typography variant="h6" gutterBottom>No Post to show</Typography>
                    }
                </div>
                <div className="accountright">

                    <Avatar src={user.avatar.url}

                        sx={{ height: "8vmax", width: "8vmax" }}
                    />

                    <Typography variant='h5' >{user.name}</Typography>

                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>Followers</Typography>
                        </button>
                        <Typography>{user.followers.length}</Typography>
                    </div>
                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            <Typography>Following</Typography>
                        </button>
                        <Typography>{user.following.length}</Typography>
                    </div>
                    <div>
                        <Typography>Post</Typography>

                        <Typography>{user.posts.length}</Typography>
                    </div>

                    <Button variant="contained" onClick={logoutHandler}>Logout</Button>

                    <Link to='/update/profile'>Edit Profile</Link>
                    <Link to='/update/password'>Change Password</Link>

                    <Button disabled={deleteLoading} onClick={()=>setDeleteToggle(!deleteToggle)} variant="text" style={{ color: "red", margin: "2vmax" }}>Delete Profile</Button>

                </div>

                <Dialog
                    open={followersToggle}
                    onClose={() => setFollowersToggle(!followersToggle)}>

                    <div className="DialogBox">
                        <Typography variant='h4'>Followers</Typography>
                    </div>


                    {
                        user && user.followers.length > 0 ? user.followers.map((follower) => ((
                            <User

                                key={follower._id}
                                userId={follower._id}
                                name={follower.name}
                                avatar={follower.avatar.url}

                            />
                        )))
                            : <Typography variant="h6" color="textSecondary">No follower to show</Typography>
                    }

                </Dialog>
                <Dialog
                    open={followingToggle}
                    onClose={() => setFollowingToggle(!followingToggle)}>

                    <div className="DialogBox">
                        <Typography variant='h4'>Following</Typography>
                    </div>


                    {
                        user && user.following.length > 0 ? user.following.map((follow) => ((
                            <User

                                key={follow._id}

                                userId={follow._id}
                                name={follow.name}
                                avatar={follow.avatar.url}

                            />
                        )))
                            : <Typography variant="h6" color="textSecondary">No following to show</Typography>
                    }

                </Dialog>

                <Dialog
                    open={deleteToggle}
                    onClose={() => setDeleteToggle(!deleteToggle)}>

                    <div className="DialogBox">
                        <Typography variant='h4'>Are you Sure You want to delete your account?</Typography>
                        <Typography variant='h6'>Once Deleted all the data belongs to you will also be deleted</Typography>
                    </div>
                    <Button variant="contained" onClick={deleteHandler}>Yes</Button>
                    <Button variant="contained" onClick={()=>setDeleteToggle(!deleteToggle)}>Cancel</Button>
                </Dialog>
            </div>
    )
}

export default Account