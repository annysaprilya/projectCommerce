
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="card">
        <p><Link to="/AddProduct">Add Product</Link></p>
        <p><Link to="/AddCategory">Add Category</Link></p>
        <p><Link to="/CartList">Cart</Link></p>


      <h1>Vite + React</h1>
      <Link to={"/login"}>halaman login</Link>
      <br/>
      <Link to={"/register"}>halaman register</Link>

      <div className="card">
        <p>
          <Link to="/Home">Home</Link>
        </p>

      </div>
    </>
  );
}

export default App;
