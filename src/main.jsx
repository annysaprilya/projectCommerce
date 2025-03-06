import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import AddProduct from './pages/AddProduct.jsx'
import AddCategory from './pages/AddCategory.jsx'
import { Toaster } from 'react-hot-toast'
import CartList from './pages/CartList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/CartList" element={<CartList />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
