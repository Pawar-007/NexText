export default function getSender(loggedUser,users){

   return loggedUser._id === users[0]._id ? users[1].name : users[0].name;
}

export  function getSenderFull(loggedUser,users){
   return loggedUser._id === users[0].id ? users[0] : users[1];
}

export function isSameSender(messages,currentMessage,index,userId){
   return(
      index < messages.length-1 &&
      (messages[index+1].sender._id!==currentMessage.sender._id ||
       messages[index+1].sender._id === undefined) &&
       messages[index].sender._id !== userId
      )
}

export function isLastMessage(messages,index,userId){
   return (
      index === messages.length-1 &&
      messages[messages.length-1].sender._id !== userId &&
      messages[messages.length-1].sender._id
   )
}

