import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './App'
import { Login } from './pages/Login'
import { Layout } from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />       {/* ⬅️ Вот он */}
            <Route path="/dashboard" element={<App />} />
            <Route path="/" element={<Login />} />            {/* Можно сделать и это */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.StrictMode>
)
