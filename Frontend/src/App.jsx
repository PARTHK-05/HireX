import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import {Routes , Route, Navigate} from "react-router"
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import ProblemPage from './pages/ProblemPage'

function App() {
  const {isSignedIn , isLoaded}=useUser()

  if(!isLoaded)  return null;
  return (
    <>
      <Routes>
        <Route path='/' element={!isSignedIn ? <HomePage/> : <Navigate to={"/dashboard"}/> } />
        <Route path='/dashboard' element={isSignedIn ? <Dashboard/> : <Navigate to={"/"}/> } />

        <Route path='/problems' element={ isSignedIn ?  <ProblemsPage/> : <Navigate to={"/"}/>} />
        <Route path='/problem/:id' element={ isSignedIn ?  <ProblemPage/> : <Navigate to={"/"}/>} />

      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { zIndex: 9999 },
        }}
      />
    </>
  )
}

export default App
