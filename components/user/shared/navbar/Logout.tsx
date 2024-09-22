'use client'
import React from 'react'
import { logout } from '@/actions/auth'

const Logout = () => {
  return (
    <div>
        <button onClick={() => logout()}>
            sign out 
        </button>
    </div>
  )
}

export default Logout