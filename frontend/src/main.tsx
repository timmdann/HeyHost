import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import { Login } from './pages/Login'
import Layout from './components/Layout'
import { Welcome } from './pages/Welcome'
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.StrictMode>
)
