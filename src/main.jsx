
import Home from "./pages/Home.jsx";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AddProduct from './pages/AddProduct.jsx'
import AddCategory from './pages/AddCategory.jsx'
import { Toaster } from 'react-hot-toast'
import CartList from './pages/CartList.jsx'

import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/CartList" element={<CartList />} />


        <Route path="/Home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)

