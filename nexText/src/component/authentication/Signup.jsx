import React from "react";
import './auth.css'
import { useState } from "react";
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [name,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confermPass,setConfermPass]=useState('');
  const [Avatar,setAvatar]=useState(); 
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

async function pictureSelected(file) {
  setLoading(true);
    if(!file){
        setLoading(false);
        toast.error(
      <div>
        <strong>Error:</strong> picture is not uploaded 
      </div>,
      {
        position: "bottom-left",
        autoClose: 3000,            // Time limit (3 seconds)
        hideProgressBar: true,     // Hide progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",             // Dark theme for error toasts
      }
    )
    return
    }
    else{
      setAvatar(file);
      toast.success(
      <div>
        <strong>Success:</strong> Picture selected.
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );

    }
    setLoading(false);
} 

async function handleSignup(e){
      e.preventDefault();
      setLoading(true);
      
    if(!name || !email || !password || !confermPass){
    setLoading(false);
     toast.error(
      <div>
        <strong>Error:</strong> Something went wrong!
      </div>,
      {
        position: "bottom-left",
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
     if(password!=confermPass){
      toast.error(
      <div>
        <strong>Error:</strong>Your confirm password doesn't match the password provided.
      </div>,
      {
        position: "top-center",
        width:"50px",
        autoClose: 3000,            // Time limit (3 seconds)
        hideProgressBar: true,     // Hide progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",             // Dark theme for error toasts
      })
      return
     }
    try {
      const form=new FormData();
      form.append('name',name);
      form.append('email',email);
      form.append('picture',Avatar);
      form.append('password',password);

      const response=await fetch('http://localhost:8000/app/user',{
        method:"POST",
        body:form
      }
      )  
      if (response.ok) {
      const data = await response.json();
      toast.success(
        <div>
          <strong>Success:</strong> Your request has been completed!
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } else {
      toast.error(
      <div>
        <strong>error</strong> 
      </div>,
      {
        position: "bottom-left",
        autoClose: 3000,            // Time limit (3 seconds)
        hideProgressBar: true,     // Hide progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",             // Dark theme for error toasts
      }
    )
    setLoading(false);
      throw new Error(response);
    }

    } catch (error) {
      setLoading(false);
      toast.error(
      <div>
        <strong>Error: </strong> 
        {error.response?.data?.message || error.message || "not get response"}
      </div>,
      {
        position: "bottom-left",
        autoClose: 3000,            // Time limit (3 seconds)
        hideProgressBar: true,     // Hide progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",             // Dark theme for error toasts
      }
    )
    }
  }
  


  return (
    <>
    <ToastContainer/>
    <div className="signup-container">
      <h3 className="signup-heading">Sign Up Form</h3>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter your username" 
            className="input-field" 
            required 
            value={name}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            className="input-field" 
            required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter your password" 
            className="input-field" 
            required 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Conferm Password</label>
          <input 
            type="password" 
            id="Confirm-password" 
            placeholder="Conferm password" 
            className="input-field" 
            required 
            value={confermPass}
            onChange={(e)=>setConfermPass(e.target.value)}
            
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input 
            type="file" 
            id="avatar" 
            className="input-field file-input" 
            onChange={(e)=>pictureSelected(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? (
          <div className="spinner"></div> 
        ) : (
          'Sign Up'
        )}
      </button>
      </form>
    </div>
    </>
    
  );
}


export default Signup;