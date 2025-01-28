import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ChatProvider from './context/ChatProvider.jsx';
import { Provider } from "@/components/ui/provider.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <Provider> {/* Wrap your app with ChakraProvider */}
          <App />
        </Provider>
      </ChatProvider>
    </BrowserRouter>
  </StrictMode>
);
