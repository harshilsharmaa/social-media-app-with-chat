import React from 'react'
import {format} from 'timeago.js'
import './Message.css'

const Message = ({own, message}) => {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
        {<img className='messageImg' src={message?.sender?.avatar?.url} alt="" /> }
        <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message