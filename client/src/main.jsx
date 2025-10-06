import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
      <div id="smooth-wrapper" >
      <div id="smooth-content"><StrictMode>
    <App />
  </StrictMode>
  </div>
    </div>
)
