import {createReducer} from '@reduxjs/toolkit';


const initialState = {};

export const userReducer = createReducer(initialState,{

    LoginRequest: (state)=>{
        state.loading = true;
    },
    LoginSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
    },
    LoginFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
    },

    RegisterRequest: (state)=>{
        state.loading = true;
    },
    RegisterSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
    },
    RegisterFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
    },

    LoadUserRequest: (state)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate = true;
    },
    LoadUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
    },

    LogoutUserRequest: (state)=>{
        state.loading = true;
    },
    LogoutUserSuccess: (state)=>{
        state.loading = false;
        state.user = null;
        state.isAuthenticate = false;
    },
    LogoutUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = true;
    },

    // Update user profile
    UpdateProfileRequest: (state)=>{
        state.loading = true;
    },
    UpdateProfileSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    UpdateProfileFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Update Password
    UpdatePasswordRequest: (state)=>{
        state.loading = true;
    },
    UpdatePasswordSuccess: (state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    UpdatePasswordFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Delete user profile
    DeleteUserRequest: (state)=>{
        state.loading = true;
    },
    DeleteUserSuccess: (state,action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    DeleteUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Forgot Password
    ForgotPasswordRequest: (state)=>{
        state.loading = true;
    },
    ForgotPasswordSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload
    },
    ForgotPasswordFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    // Reset Password
    ResetPasswordRequest: (state)=>{
        state.loading = true;
    },
    ResetPasswordSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload
    },
    ResetPasswordFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=> {
        state.error = null;
    }
});


export const postOfFollowingReducer = createReducer(initialState,{
    postOfFollowingRequest: (state)=> {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action)=> {
        state.loading = false;
        state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action)=> {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=> {
        state.error = null;
    }

})


export const allUsersReducer = createReducer(initialState,{
    allUsersRequest: (state)=> {
        state.loading = true;
    },
    allUsersSuccess: (state, action)=> {
        state.loading = false;
        state.users = action.payload;
    },
    allUsersFailure: (state, action)=> {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=> {
        state.error = null;
    }

})

export const userProfileReducer = createReducer(initialState,{
    userProfileRequest: (state)=> {
        state.loading = true;
    },
    userProfileSuccess: (state, action)=> {
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailure: (state, action)=> {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=> {
        state.error = null;
    }

})

export const followUserReducer = createReducer(initialState,{
    followUserRequest: (state)=> {
        state.loading = true;
    },
    followUserSuccess: (state, action)=> {
        state.loading = false;
        state.user = action.payload;
    },
    followUserFailure: (state, action)=> {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=> {
        state.error = null;
    }

})