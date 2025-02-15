import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ChatsPage from './pages/ChatsPage.jsx'
function RouterConfig() {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path='/chats' element={<ChatsPage/>}/>      
      </Routes>
    </div>
  )
}

export default RouterConfig
