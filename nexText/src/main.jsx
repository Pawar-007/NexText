import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "./components/ui/provider"
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ChatProvider from './context/ChatProvider.jsx'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <ChatProvider>
     <Provider>  
      <App />
     </Provider>
     </ChatProvider>
    </BrowserRouter>
  
 
)
