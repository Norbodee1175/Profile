import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/Profile'>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)