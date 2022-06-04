import React from 'react'
import './UserChat.css'
import {format} from 'timeago.js'

const UserChat = ({user, isOnline}) => {


  return (
    <>
        <div className='user-chat'>
            <div className='user-chat-image'>
                <img src={user.avatar.url} alt=""/>
                {
                  isOnline ? <div className='online-badge'></div> : null
                }
            </div>
            <div className='user-chat-name'>
                <h5>{user.name}</h5>
            </div>
            <div className="last-seen-box">                
            {
              isOnline ? null:
              user.lastSeen?
              <div className='last-seen'>
                <p>Last Seen</p>
                <p>{format(user.lastSeen)}</p>
              </div>:null
            }
           </div>
        </div>
    </>
  )
}

export default UserChat