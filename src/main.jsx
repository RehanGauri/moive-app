import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WatchlistProvider } from "./context/WatchlistContext.jsx";

createRoot(document.getElementById('root')).render(

  <WatchlistProvider>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </WatchlistProvider>
)
