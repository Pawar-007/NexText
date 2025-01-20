import React from "react";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import './auth.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault();
    setLoading(true);
    console.log("email password ",email , password);
    if(!email || !password){
    setLoading(false);
     toast.error(
      <div>
        <strong>Error:</strong> All field require
      </div>,
      {
        position: "top-center",
        autoClose: 3000,            // Time limit (3 seconds)
        hideProgressBar: true,     // Hide progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",             // Dark theme for error toasts
      }
    )
    return;
    }
    try {
      console.log(email," ",password);
      const config={
      headers:{
        "content-type":"application/json"
      }
    }
    const {data}=await axios.post(`http://localhost:8000/app/user/login`,
      {email,password},
      config
    )
    console.log("data ", data);
    toast.success(
        <div>
          <strong>Success:</strong> login successfull 
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );

      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log("error ","catch error");
      console.error("error",error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(
      <div>
        <strong>Error:</strong> {errorMessage}
      </div>,
      {
        position: "top-center",
        autoClose: 3000,            // Time limit (3 seconds)
        hideProgressBar: true,     // Hide progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",             // Dark theme for error toasts
      }
    )
    setLoading(false);
    }
      
  }
  return (
    <>
    <ToastContainer/>
    <div className="login-container">
      <h3 className="login-heading">Login Form</h3>
      <form className="login-form" onSubmit={(e)=>handleLogin(e)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <form className="form-floating">
          <input type="email"
           className="form-control" 
           id="email" 
           placeholder="Enter your email" 
           value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required 
          />
      <label for="floatingInputValue">Input with value</label>    
      </form>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <form className="form-floating">
          <input type="password"
           className="form-control input-field" 
           id="password" 
           placeholder="Enter your password" 
           value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required 
          />
      <label for="floatingInputValue">Input with value</label>    
      </form>
        </div>
        
        {
          loading?
          <div 
      className="spinner-border" 
      role="status" 
      style={{
        width: '1.5rem', 
        height: '1.5rem', 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)'
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>:
        <button 
        type="submit" 
        className="submit-btn"
        onClick={handleLogin}>Login</button>
        }
        <button 
        type="submit" 
        className="submit-btn guest-button"
        style={{ 
        color: 'black', 
        width: '100%', 
        marginTop: '4px',
        background:'red' 
        }}
        >Guest user </button>
        <p className="signup-prompt">
          Don't have an account? <span className="signup-link">Sign up</span>
        </p>
      </form>
    </div>
    </>
  );
}

export default Login;