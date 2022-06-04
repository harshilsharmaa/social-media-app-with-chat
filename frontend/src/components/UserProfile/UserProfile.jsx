import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../User/User'
import { getUserProfile, getUserPosts, followUser } from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Avatar, Button, Dialog } from '@mui/material'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import { useAlert } from 'react-alert'



const UserProfile = () => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const params = useParams();

    const { user, loading: userLoading, } = useSelector((state) => state.userProfile);
    const { user: me, } = useSelector((state) => state.user);



    const { loading, error, posts } = useSelector((state) => state.userPosts);

    const { error: likeError, message, } = useSelector(state => state.like);

    const { error: followUserError, message:followUserMessage, loading: followLoading } = useSelector(state => state.followUser);

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState("");


    const followHandler = async () => {
        setFollowing(!following);
        await dispatch(followUser(params.id));
        dispatch(getUserProfile());
    }




    useEffect(() => {

        dispatch(getUserProfile(params.id));
        dispatch(getUserPosts(params.id));



    }, [dispatch,params.id])


    useEffect(() => {

        if(me._id===params.id){
            setMyProfile(true);
        }

        if(user){
            user.followers.forEach((item) => {
                if(item._id===me._id){
                    setFollowing(true);
                }
            })
        }
        else{
            setFollowing(false);
        }
    }, [user, me._id, params.id])
    

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearError" })
        }
        if (likeError) {
            alert.error(likeError);
            dispatch({ type: "clearError" })
        }
        if (followUserError) {
            alert.error(followUserError);
            dispatch({ type: "clearError" })
        }

        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" })
        }
        if (followUserMessage) {
            alert.success(followUserMessage);
            dispatch({ type: "clearMessage" })
        }
    }, [alert, dispatch, followUserError, followUserMessage, error, message, likeError])

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
                                isAccount={false}
                                isDelete={false}
                            />
                        ))
                            : <Typography variant="h6" gutterBottom>User has not made any post</Typography>
                    }
                </div>
                <div className="accountright">

                    {
                        user && (
                            <>
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

                                {
                                    myProfile ? null : <Button disabled={followLoading} style={{ background: following ? "red" : "" }} onClick={followHandler} variant="contained">{following ? "Unfollow" : "Follow"}</Button>
                                }
                            </>
                        )
                    }

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

            </div>
    )
}

export default UserProfile