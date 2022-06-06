import axios from "axios" 

export const loginUser = (email, password)=> async(dispatch)=>{
    try {

        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axios.post('/api/v1/login', {email, password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })


    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error.response.data.message
        })
    }
}
export const RegisterUser = (name, email, avatar, password)=> async(dispatch)=>{
    try {

        dispatch({
            type:"RegisterRequest"
        })

        const {data} = await axios.post('/api/v1/register', {name,email, avatar, password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"RegisterSuccess",
            payload:data.user
        })


    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data.message
        })
    }
}

export const loadUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type:"LoadUserRequest"
        })
       const {data} = await axios.get('/api/v1/me');



        dispatch({
            type:"LoadUserSuccess",
            payload: data.user
        })


    } catch (error) {
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message
        })
    }
}

export const getFollowingPosts = ()=> async (dispatch) =>{
    try {

        dispatch({
            type:"postOfFollowingRequest"
        });

        const {data} = await axios.get('/api/v1/posts');
        
        dispatch({
            type:"postOfFollowingSuccess",
            payload:data.posts
        });

    } catch (error) {

        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
        })
    }
}

export const getMyPosts = ()=> async (dispatch) =>{
    try {

        dispatch({
            type:"myPostsRequest"
        });

        const {data} = await axios.get('/api/v1/my/posts');
        
        dispatch({
            type:"myPostsSuccess",
            payload:data.posts
        });

    } catch (error) {

        dispatch({
            type: "myPostsFailure",
            payload: error.response.data.message,
        })
    }
}


export const getAllUsers = (name="")=> async (dispatch) =>{
    try {

        dispatch({
            type:"allUsersRequest"
        });

        const {data} = await axios.get(`/api/v1/users?name=${name}`);
        
        dispatch({
            type:"allUsersSuccess",
            payload:data.users
        });

    } catch (error) {

        dispatch({
            type: "allUsersFailure",
            payload: error.response.data.message,
        })
    }
}



export const logoutUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type:"LogoutUserRequest"
        })

        await axios.get('/api/v1/logout')

        dispatch({
            type:"LogoutUserSuccess",
        })


    } catch (error) {
        dispatch({
            type:"LogoutUserFailure",
            payload:error.response.data.message
        })
    }
}

export const deleteUser = ()=> async(dispatch)=>{
    try {

        dispatch({
            type:"DeleteUserRequest"
        })

        await axios.delete('/api/v1/delete/me')

        dispatch({
            type:"DeleteUserSuccess",
        })


    } catch (error) {
        dispatch({
            type:"DeleteUserFailure",
            payload:error.response.data.message
        })
    }
}

export const updateProfile = (name, email, avatar)=> async(dispatch)=>{
    try {

        dispatch({
            type:"UpdateProfileRequest"
        })

        const {data} = await axios.put('/api/v1/update/profile',{
            name,
            avatar,
            email
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })

        dispatch({
            type:"UpdateProfileSuccess",
            payload:data.message
        })


    } catch (error) {
        dispatch({
            type:"UpdateProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const updatePassword = (oldPassword, newPassword)=> async(dispatch)=>{
    try {

        dispatch({
            type:"UpdatePasswordRequest"
        })

        const {data} = await axios.put('/api/v1/update/password',{
            oldPassword,
            newPassword
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })

        dispatch({
            type:"UpdatePasswordSuccess",
            payload:data.message
        })


    } catch (error) {
        dispatch({
            type:"UpdatePasswordFailure",
            payload:error.response.data.message
        })
    }
}


export const forgotPassword = (email)=> async(dispatch)=>{
    try {

        dispatch({
            type:"ForgotPasswordRequest"
        })

        const {data} = await axios.post('/api/v1/forgot/password',{
            email
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })

        dispatch({
            type:"ForgotPasswordSuccess",
            payload:data.message
        })


    } catch (error) {
        dispatch({
            type:"ForgotPasswordFailure",
            payload:error.response.data.message
        })
    }
}

export const resetPassword = (token,password)=> async(dispatch)=>{
    try {

        dispatch({
            type:"ResetPasswordRequest"
        })

        const {data} = await axios.put(`/api/v1/password/reset/${token}`,{
            password
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })

        dispatch({
            type:"ResetPasswordSuccess",
            payload:data.message
        })


    } catch (error) {
        dispatch({
            type:"ResetPasswordFailure",
            payload:error.response.data.message
        })
    }
}



export const getUserPosts = (id)=> async (dispatch) =>{
    try {


        dispatch({
            type:"userPostsRequest"
        });

        const {data} = await axios.get(`/api/v1/userposts/${id}`);
        
        dispatch({
            type:"userPostsSuccess",
            payload:data.posts
        });

    } catch (error) {

        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message,
        })
    }
}

export const getUserProfile = (id)=> async (dispatch) =>{
    try {


        dispatch({
            type:"userProfileRequest"
        });

        const {data} = await axios.get(`/api/v1/user/${id}`);
        
        dispatch({
            type:"userProfileSuccess",
            payload:data.user
        });

    } catch (error) {

        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        })
    }
}

export const followUser = (id)=> async (dispatch) =>{
    try {

        dispatch({
            type:"followUserRequest"
        });

        const {data} = await axios.get(`/api/v1/follow/${id}`);
        
        dispatch({
            type:"followUserSuccess",
            payload:data.message
        });

    } catch (error) {

        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,
        })
    }
}