import axios from 'axios';
import React, { useState } from 'react'
import { data, Form, useNavigate } from 'react-router'
import './Login.css'; // Menggunakan CSS yang sama dengan halaman login
import Navbar from '../components/Navbar';

function Register() {
    let nav = useNavigate();
    const [formRegister, setFormRegister] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer"
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formRegister.password !== formRegister.confirmPassword) {
            alert("Password dan Konfirmasi Password harus sama!");
            return;
        }
        try {
            const data = await axios.post("http://10.50.0.13:3003/register", {
                email: formRegister.email,
                password: formRegister.password,
                role: formRegister.role
            });
            localStorage.setItem("accessToken", data.data.accessToken);
            console.log(data.data);
            nav("/");
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
      <div>
        <Navbar/>
        <div className='login-page'>
          <div className="login-container">
              <div className="login-box">
                  <h2>Register</h2>
                  <form onSubmit={handleSubmit} className="login-form">
                      <div className="input-group">
                          <label htmlFor='email'>Email</label>
                          <input 
                              type='text' 
                              id='email' 
                              placeholder='Enter your email' 
                              value={formRegister.email}
                              onChange={(event) => setFormRegister({ ...formRegister, email: event.target.value })} 
                          />
                      </div>
                      
                      <div className="input-group">
                          <label htmlFor='password'>Password</label>
                          <input 
                              type='password' 
                              id='password' 
                              placeholder='Enter your password' 
                              value={formRegister.password}
                              onChange={(event) => setFormRegister({ ...formRegister, password: event.target.value })} 
                          />
                      </div>
                      
                      <div className="input-group">
                          <label htmlFor='confirmPassword'>Confirm Password</label>
                          <input 
                              type='password' 
                              id='confirmPassword' 
                              placeholder='Re-enter your password' 
                              value={formRegister.confirmPassword}
                              onChange={(event) => setFormRegister({ ...formRegister, confirmPassword: event.target.value })} 
                          />
                      </div>
                      
                      <button type='submit' className="login-button">Register</button>
                  </form>
                  <p className="register-link">
                      Already have an account? <a href="/login">Login here</a>
                  </p>
              </div>
          </div>
        </div>
      </div>
    );
}

export default Register;