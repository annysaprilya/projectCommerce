import axios from 'axios';
import React, { useState } from 'react'
import { data, Form, useNavigate } from 'react-router'

function Register() {
    let nav = useNavigate();
    // const {showToast} = useToast()
    const [formRegister, setFormRegister] = useState({
      email:"",
      password:"",
      role:"customer"
    })

    const handleSubmit = async(event) =>{
      event.preventDefault()
      try {
        const data = await axios.post("http://10.50.0.13:3003/register",{
          email: formRegister.email,
          password: formRegister.password,
          role: formRegister.role
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
          setFormRegister({...formRegister,email: event.target.value})
        }} />
        <br/>
        <label htmlFor='password'>password</label>
        <input type='password' id='password' onChange={(event)=>{
          setFormRegister({...formRegister,password: event.target.value})
        }} />
        <br/>

        <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default Register