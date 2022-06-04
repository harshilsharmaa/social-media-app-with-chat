import React, { useEffect, useRef, useState} from 'react'
import './Messanger.css'
import Message from '../Message/Message'
import UserChat from '../UserChat/UserChat'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'

// const socket = io.connect('http://localhost:5000');
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER_URL);

const Messanger = () => {
    console.log(process.env.REACT_APP_SOCKET_SERVER_URL);

    const { user, loading: userLoading, } = useSelector(state => state.user);
    const [currentChat, setCurrentChat] = useState(null); 
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [arivalMessage, setArivalMessage] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);

    const [loading, setLoading] = useState(false);

    const scrollRef = useRef();


    useEffect(() => {
        const getMessages = async()=>{
            try {
                const res = await axios.get(`api/v1/message/${currentChat?._id}`);
                setMessages(res.data.allMessages);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat])



    const newConversation = async(friendId)=>{
        try {

            setLoading(true);

            const res = await axios.post(`api/v1/conversation`,{senderId: user._id, receiverId: friendId});

            if(res.data.exist){
                setCurrentChat(res.data.oldConversations[0]);
            }
            else{
                setCurrentChat(res.data.conversation);
            }

            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newMessageData = {
            text: newMessage,
            conversationId: currentChat?._id,
            sender: user._id
        }

        const receiverId = currentChat?.members.find(member=> member !== user._id);


        socket.emit('sendMessage', {userId: user._id, receiverId, text: newMessage});

        try {
            const res = await axios.post('/api/v1/newmessage', newMessageData);
            setMessages([...messages, res.data.message]);
            
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {   
        socket.off('getMessage').on('getMessage', (data) => {
            setArivalMessage({
                text: data.text,
                sender: data.userId,
                createdAt: Date.now(),
            });
        })

        socket.on('disconnect')
    })

    useEffect(() => {

        arivalMessage &&
        currentChat?.members.includes(arivalMessage.sender) &&
        setMessages((prev)=>[...prev, arivalMessage]);

    },[arivalMessage, currentChat])


    useEffect(() => {
        socket.emit('addUser', user._id);
    }, [user,socket]);


    useEffect(() => {
        socket.on('getUsers', (payload)=>{
            setOnlineUser(user.following.filter((f)=> payload.some((u) => u.userId===f._id)));
        })
    })


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])



  return (
    <>
        <div className='messanger'>

            <div className="messanger-left">
                <h3>Your Friends</h3>
            
                {   onlineUser && user ?
                    user?.following.map((f)=>{
                        return (
                            <div onClick={()=>newConversation(f._id)}>
                                <UserChat key={f._id} user={f} isOnline={onlineUser?.includes(f)}/>
                            </div>
                        )
                    }):<h5>Follow users to chat</h5>
                }
            </div>

            <div className="chat-box">

                {
                    loading? <p>Loading</p>:
                
               
                <div className="chatBoxWrapper">
                    {
                        currentChat ? 
                        <> 
                        <div className="chatBoxTop">
                            {
                                messages?messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message key={m._id} message={m} own={m.sender._id === user._id}/>
                                    </div>
                                ) ):null
                            }

                        </div>
                        <div className="chatBoxBottom">
                            <input 
                            onKeyPress={(e)=>e.key==='Enter' ? handleSubmit(e): null}
                            value={newMessage} 
                            onChange={(e)=>setNewMessage(e.target.value)} 
                            className='chatMessageInput' 
                            placeholder='Write something here...'
                            />
                            <button className='chatSubmitBtn' onClick={handleSubmit}>Send</button>
                        </div>
                        </>: <span>Open a Conversation</span>} 
                </div>

                }
            </div>
          
        </div>
    </>
  )
}

export default Messanger