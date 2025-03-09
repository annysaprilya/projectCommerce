import axios from 'axios';
import React, { useState } from 'react'
import { data, Form, useNavigate } from 'react-router'
import './Login.css';
import Navbar from '../components/Navbar';

function Login() {
  let nav = useNavigate();
  const [formLogin, setFormLogin] = useState({
      email: "",
      password: ""
  });

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post("http://localhost:3003/login", {
              email: formLogin.email,
              password: formLogin.password
          });
          
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log(response.data);
          nav("/home");
      } catch (error) {
          console.error("Login failed:", error);
      }
  };

  return (
    <div>
      <Navbar/>
      <div className='login-page'>
        
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='text' 
                            id='email'
                            placeholder='Enter your email'  
                            value={formLogin.email}
                            onChange={(event) => setFormLogin({ ...formLogin, email: event.target.value })} 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            id='password'
                            placeholder='Enter your password' 
                            value={formLogin.password}
                            onChange={(event) => setFormLogin({ ...formLogin, password: event.target.value })} 
                        />
                    </div>
                    
                    <button type='submit' className="login-button">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;