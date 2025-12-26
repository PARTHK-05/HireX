import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
      <h1 className='text-4xl'>Hello World</h1>
      <SignedOut>
        <SignInButton mode ="modal">
          <button className='text-2xl px-5 py-2 border-2 border-black rounded-2xl'>
            Sign up please
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>

      <SignedIn>
       <UserButton/>
      </SignedIn>

    </>
  )
}

export default App
