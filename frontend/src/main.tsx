import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <AppRouter/>
    </AuthProvider>
  </StrictMode>,
)
