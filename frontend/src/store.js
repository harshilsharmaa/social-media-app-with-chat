import {configureStore} from '@reduxjs/toolkit';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

import {postOfFollowingReducer, allUsersReducer, userReducer,userProfileReducer,followUserReducer } from './Reducers/User';


const store = configureStore({
    reducer:{
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userPosts: userPostsReducer,
        userProfile: userProfileReducer,
        followUser: followUserReducer
    },
})

export default store;