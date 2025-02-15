import React from "react"
import { Router } from "react-router-dom"
import RouterConfig from "./routerConfig"
import './App.css'
import axios from "axios";

axios.defaults.baseURL=`${import.meta.env.VITE_PATH}`;
function App() {

  return (
   <div className="app">
      <RouterConfig/>
   </div>
    
   
  )
}

export default App
