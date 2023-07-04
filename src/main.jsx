import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import "./i18n"
import 'react-toastify/dist/ReactToastify.css';
import ScrollToUp from './Components/ScrollToUp/ScrollToUp.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ScrollToUp/>
    </BrowserRouter>
  </React.StrictMode>,
)
