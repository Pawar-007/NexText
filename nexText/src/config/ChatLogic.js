export default function getSender(loggedUser,users){
   return loggedUser._id === users[0].id ? users[0].name : users[1].name;
}