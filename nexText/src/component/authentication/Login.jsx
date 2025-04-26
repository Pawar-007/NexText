import React from "react";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import './auth.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login({setActiveTab}) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault();
    setLoading(true);
  
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
      
      const config={
      headers:{
        "content-type":"application/json"
      }
    }
    const {data}=await axios.post(`/app/user/login`,
      {email,password},
      config
    )
 
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

  const handleGuestLogin = async () => {
  setLoading(true);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const { data } = await axios.post(`/app/user/guestUser`, {}, config);
    console.log("guestUser ",data);
    toast.success(
      <div>
        <strong>Success:</strong> Guest session started
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

    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate("/chats");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to start guest session";
    toast.error(
      <div>
        <strong>Error:</strong> {errorMessage}
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
    setLoading(false);
  }
};


  return (
    <>
    <ToastContainer/>
    <div className="login-container">
  <h3 className="login-heading">Login Form</h3>
  <form className="login-form" onSubmit={(e) => handleLogin(e)}>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="email">Input with value</label>
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="password">Password</label>
      <div className="form-floating">
        <input
          type="password"
          className="form-control input-field"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password">Input with value</label>
      </div>
    </div>

    {loading ? (
     <div
      className="spinner-border"
      role="status"
      style={{
        width: '1rem', // Smaller size to fit inside the button
        height: '1rem',
        borderWidth: '0.15rem', // Adjust spinner thickness
        margin: '0 auto',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    ) : (
      <button type="submit" className="submit-btn">
        Login
      </button>
    )}

    <button
      type="button"
      className="submit-btn guest-button"
      style={{
        color: 'black',
        width: '100%',
        marginTop: '4px',
        background: 'red',
      }}
      onClick={handleGuestLogin}
      disabled={loading}
    >
      {loading ? "Loading..." : "Continue as Guest"}
    </button>

    <button className="signup-prompt"
    onClick={() => setActiveTab('signup')}
    >
      Don't have an account? <span className="signup-link">Sign up</span>
    </button>
  </form>
</div>

    </>
  );
}

export default Login;