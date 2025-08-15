import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query'
import { router } from './routers/Routes.jsx'


createRoot(document.getElementById('root')).render(

      <React.StrictMode>
   
      <AuthProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
   
  </React.StrictMode>
 ,
)
