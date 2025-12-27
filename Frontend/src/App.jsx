import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import {Routes , Route, Navigate} from "react-router"
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import {Toaster} from 'react-hot-toast'

function App() {
  const {isSignedIn}=useUser()
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/problems' element={ isSignedIn ?  <ProblemsPage/> : <Navigate to={"/"}/>} />
      </Routes>
      <Toaster position="top-right" toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
