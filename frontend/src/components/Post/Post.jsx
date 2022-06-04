import React, { useState, useEffect } from 'react'

import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,

} from "@mui/icons-material"
import { Link } from 'react-router-dom'
import './Post.css'
import { Avatar, Typography, Button, Dialog } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentOnPost,  deletePost, likePost, updatePost } from '../../Actions/Post'
import { getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User'
import User from '../User/User'
import CommentCard from '../CommentCard/CommentCard'


const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) => {

    const [liked, setLiked] = useState(false);
    const [likesUser, setlikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState("");
    const [captionToggle, setCaptionToggle] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(
        (state) => state.user
    );


    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        // alert.success("Liked")

        if (isAccount) {
            dispatch(getMyPosts())
        }
        else {
            dispatch(getFollowingPosts());
        }
    }

    


    const addCommentHandler = async (e) => {

        e.preventDefault();

        await dispatch(addCommentOnPost(postId, commentValue));

        if (isAccount) {
            dispatch(getMyPosts())
        }
        else {
            dispatch(getFollowingPosts());
        }
    }

    const updateCaptionHandler = async(e)=> {
        e.preventDefault();

        await dispatch(updatePost(captionValue, postId));

        dispatch(getMyPosts())
    }

    const deletePostHandle = async(e)=>{
        e.preventDefault();

        await dispatch(deletePost(postId));

        dispatch(getMyPosts())
        dispatch(loadUser())
    }

    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setLiked(true);
            }
        })
    }, [likes, user._id])




    return (
        <div className='post'>

            <div className="postHeader"></div>

            {
                isAccount ? <Button onClick={() => setCaptionToggle(!captionToggle)}>
                    <MoreVert />
                </Button> : null
            }

            <img src={postImage} alt="Post" />

            <div className="postDetails">

                <Avatar src={ownerImage} alt="User" sx={{ height: "3vmax", width: "3vmax" }} />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700} >{ownerName}</Typography>
                </Link>

                <Typography fontWeight={100} color="rgba(0,0,0,0.582)" style={{ alignSelf: "center" }} >{caption}</Typography>

            </div>
            <button disabled={likes.length === 0 ? true : false} onClick={() => setlikesUser(!likesUser)} style={{ border: "none", backgroundColor: "white", cursor: "pointer", margin: "1vmax 2vmax" }}>
                <Typography>{likes.length} Likes</Typography>

            </button>

            <div className="postFooter">

                <Button onClick={handleLike}>

                    {
                        liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />
                    }
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                {
                    isDelete ? <Button onClick={deletePostHandle}>
                        <DeleteOutline />
                    </Button> : null
                }

            </div>

            <Dialog
                open={likesUser}
                onClose={() => setlikesUser(!likesUser)}>

                <div className="DialogBox">
                    <Typography variant='h4'>Liked By</Typography>
                </div>


                {
                    likes && likes.length > 0 ? likes.map((like) => ((
                        <User

                            key={like._id}

                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.utl}

                        />
                    )))
                        : <Typography variant="h6" color="textSecondary">No User to show</Typography>
                }

            </Dialog>

            <Dialog
                open={commentToggle}
                onClose={() => setCommentToggle(!commentToggle)}>

                <div className="DialogBox">
                    <Typography variant='h4'>Comments</Typography>

                    <form className="commentForm" onSubmit={addCommentHandler}>

                        <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Comment Here ..." required />

                        <Button type='submit' variant="contained">Add</Button>
                    </form>

                    {
                        comments && comments.length > 0 ? comments.map((item) => (
                            <CommentCard 

                                key={item._id}
                                comment={item.comment}
                                commentId={item._id}
                                postId={postId}
                                userId={item.user._id}
                                name = {item.user.url}
                                avatar={user.avatar}
                                isAccount={isAccount}

                            />
                        )): <Typography variant="h6" color="textSecondary">No Comment to show</Typography>
                    }

                </div>

            </Dialog>

            <Dialog
                open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}>

                <div className="DialogBox">
                    <Typography variant='h4'>Update Caption</Typography>

                    <form className="commentForm" onSubmit={updateCaptionHandler}>

                        <input type="text" value={captionValue} onChange={(e) => setCaptionValue(e.target.value)} placeholder="Caption..." required />

                        <Button type='submit' variant="contained">Update</Button>
                    </form>


                </div>

            </Dialog>

        </div>
    )
}

export default Post