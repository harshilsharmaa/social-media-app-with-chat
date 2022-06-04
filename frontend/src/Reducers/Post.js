import {createReducer} from '@reduxjs/toolkit';

const initialState = {}

export const likeReducer = createReducer(initialState, {

    // Like
    LikeRequest:(state)=>{
        state.loading = true;
    },

    LikeSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    LikeFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Add
    addCommentRequest:(state)=>{
        state.loading = true;
    },

    addCommentSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    addCommentFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Delete
    deleteCommentRequest:(state)=>{
        state.loading = true;
    },

    deleteCommentSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    deleteCommentFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // New Post
    NewPostRequest:(state)=>{
        state.loading = true;
    },

    NewPostSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    NewPostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Update Post caption
    UpdateCaptionRequest:(state)=>{
        state.loading = true;
    },

    UpdateCaptionSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    UpdateCaptionFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Delete Post caption
    DeletePostRequest:(state)=>{
        state.loading = true;
    },

    DeletePostSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    DeletePostFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state)=>{
        state.error = null;
    },

    clearMessage: (state)=>{
        state.message = null;
    }
})


export const myPostsReducer = createReducer(initialState, {

    myPostsRequest:(state)=>{
        state.loading = true;
    },

    myPostsSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },

    myPostsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state)=>{
        state.error = null;
    },

})

export const userPostsReducer = createReducer(initialState, {

    userPostsRequest:(state)=>{
        state.loading = true;
    },

    userPostsSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },

    userPostsFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state)=>{
        state.error = null;
    },

})