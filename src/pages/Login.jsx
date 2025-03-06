import axios from 'axios';
import React, { useState } from 'react'
import { data, Form, useNavigate } from 'react-router'

function Login() {
    let nav = useNavigate();
    // const {showToast} = useToast()
    const [formLogin, setFormLogin] = useState({
      email:"",
      password:""
    })

    const handleSubmit = async(event) =>{
      event.preventDefault()
      try {
        const data = await axios.post("http://10.50.0.13:3003/login",{
          email: formLogin.email,
          password: formLogin.password
        })
        localStorage.setItem("accessToken",data.data.accessToken)
        console.log(data.data)
        // nav("/");
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>email</label>
        <input type='text' id='email' onChange={(event)=>{
          setFormLogin({...formLogin,email: event.target.value})
        }} />
        <br/>
        <label htmlFor='password'>password</label>
        <input type='password' id='password' onChange={(event)=>{
          setFormLogin({...formLogin,password: event.target.value})
        }} />
        <br/>

        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login