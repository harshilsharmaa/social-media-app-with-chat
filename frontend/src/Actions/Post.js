import axios from "axios" 

export const likePost = (id)=> async (dispatch) =>{
    try {

        dispatch({
            type:"LikeRequest"
        });

        const {data} = await axios.post(`/api/v1/post/${id}`);
        
        dispatch({
            type:"LikeSuccess",
            payload:data.message
        });

    } catch (error) {

        dispatch({
            type: "LikeFailure",
            payload: error.response.data.message,
        })
    }
}


export const addCommentOnPost = (id, comment)=> async (dispatch) =>{
    try {

        dispatch({
            type:"addCommentRequest"
        });

        const {data} = await axios.put(`/api/v1/post/comment/${id}`, 
            {
                comment
            },
        {
            header:{
                'Content-Type':'application/json',
            }
        });
        
        dispatch({
            type:"addCommentSuccess",
            payload:data.message
        });

    } catch (error) {

        dispatch({
            type: "addCommentFailure",
            payload: error.response.data.message,
        })
    }
}


export const deleteCommentOnPost = (id, commentId)=> async (dispatch) =>{
    try {

        dispatch({
            type:"deleteCommentRequest"
        });

        // console.log(id, commentId);

        const {data} = await axios.delete(`/api/v1/post/comment/${id}`,{
            data:{commentId},
        });
        
        dispatch({
            type:"deleteCommentSuccess",
            payload:data.message
        });

    } catch (error) {

        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message,
        })
    }
}

export const createNewPost = (caption, image)=> async (dispatch) =>{
    try {

        dispatch({
            type:"NewPostRequest"
        });


        const {data} = await axios.post(`/api/v1/post/upload`,
        {
            caption,
            image,
        },
        {
            headers:{
                'Content-Type':'application/json'
            }
        });
        
        dispatch({
            type:"NewPostSuccess",
            payload:data.message,
        });

    } catch (error) {

        dispatch({
            type: "NewPostFailure",
            payload: error.response.data.message,
        })
    }
}
export const deletePost = (id)=> async (dispatch) =>{
    try {

        dispatch({
            type:"DeletePostRequest"
        });


        const {data} = await axios.delete(`/api/v1/post/${id}`);
        
        dispatch({
            type:"DeletePostSuccess",
            payload:data.message,
        });

    } catch (error) {

        dispatch({
            type: "DeletePostFailure",
            payload: error.response.data.message,
        })
    }
}


export const updatePost = (caption, id)=> async (dispatch) =>{
    try {

        dispatch({
            type:"UpdateCaptionRequest"
        });


        const {data} = await axios.put(`/api/v1/post/${id}`,
        {
            caption,
        },
        {
            headers:{
                'Content-Type':'application/json'
            }
        });
        
        dispatch({
            type:"UpdateCaptionSuccess",
            payload:data.message,
        });

    } catch (error) {

        dispatch({
            type: "UpdateCaptionFailure",
            payload: error.response.data.message,
        })
    }
}


