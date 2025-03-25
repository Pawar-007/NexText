import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../config/ChatLogic.js'
import { ChatState } from '../context/ChatProvider.jsx'
import { Tooltip} from '@/components/ui/tooltip'
import { Avatar } from "@/components/ui/avatar"

function ScrollableChat({messages}) {
  const {user}=ChatState();

  return (
    <ScrollableFeed>
      {messages && messages?.map((msg,index)=>(
        
        <div style={{display:"flex",
                    justifyContent: msg.sender._id === user._id ? "flex-end" : "flex-start",
                    alignItems: "center",
                    marginBottom: "5px",
                    padding:"5px"
        }} key={msg._id}> 
             {(isSameSender(messages,msg,index,user._id)
               || isLastMessage(messages,index,user._id) && (
                <Tooltip
                 label={msg.sender?.name || "unknown"}
                 placement='bottom-start'
                 hasArrow
                >
            
                   <Avatar
                   mt="7px"
                   mr={1}
                   size="sm"
                   cursor="pointer"
                   name={msg.sender.name}
                  src={msg.sender?.pic || undefined}
                  
                   />
                  
                </Tooltip>
                )
             )}
             <span
             style={{
              backgroundColor:msg.sender._id === user._id ? "#58bf56":"#e4e6eb",
              borderRadius:"20px",
              padding:"5px 15Px",
              maxWidth:"70%"
             }}> 
              {msg.content}
             </span>
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat

