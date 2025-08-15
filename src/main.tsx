import './assets/css/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/sonner.tsx'
import { BreadcrumbsProvider } from './components/context/breadcrumb-context.tsx'
import { BrowserRouter } from "react-router";
import { AuthProvider } from './modules/auth/components/context/auth-context.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './app-routes.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <BreadcrumbsProvider>
            <AppRoutes />
          </BreadcrumbsProvider>
          <Toaster richColors />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)