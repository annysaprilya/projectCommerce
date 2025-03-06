
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router'


function App() {


  return (
    <>


      <div>
      <p><Link to="/AddProduct">Add Product</Link></p>
        <p><Link to="/AddCategory">Add Category</Link></p>
        <p><Link to="/CartList">Cart</Link></p>
        <p><Link to="/home">home</Link></p>
        <Link to={"/login"}>halaman login</Link>
      <br/>
      <Link to={"/register"}>halaman register</Link>
      </div>



    </>
  )
}

export default App;
