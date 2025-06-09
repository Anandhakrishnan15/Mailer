import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { RowProvider } from './context/RowContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RowProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RowProvider>
    </BrowserRouter>
  </StrictMode>
);
