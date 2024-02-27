import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';
import { ConversationContextProvider } from './context/ConversationContext';
import { MessageContextProvider } from './context/MessageContext';
import { SocketContextProvide } from './context/SockerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvide>
          <ConversationContextProvider>
            <MessageContextProvider>
              <App />
            </MessageContextProvider>
          </ConversationContextProvider>
        </SocketContextProvide>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
