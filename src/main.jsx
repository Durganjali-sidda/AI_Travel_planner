import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripid]'
import Footer from './view-trip/components/Footer'
import Mytrips from './my-trips'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },
  {
    path: '/my-trips',
    element: <Mytrips />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Toaster position="top-center" />
        <main className="flex-grow">
          <RouterProvider router={router} />
        </main>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  </StrictMode>,
)
