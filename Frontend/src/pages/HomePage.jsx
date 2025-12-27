import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  return (
    <div>

    <button className='btn btn-primary' onClick={()=> toast.success("Successfully LogeIn")}>Click</button>

        <SignedOut>
            <SignInButton mode='modal'>
                <button className='btn btn-secondary'>Login In</button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
            <SignOutButton/>
        </SignedIn>

        <UserButton/>

    </div>
  )
}

export default HomePage