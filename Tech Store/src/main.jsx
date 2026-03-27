import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './context/UserProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
)


const reveal = () => {
  const elements = document.querySelectorAll(".fade-up")

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top
    const screenHeight = window.innerHeight

    if (elementTop < screenHeight - 100) {
      el.classList.add("show")
    }
  })
}

window.addEventListener("scroll", reveal)
setTimeout(reveal, 300)