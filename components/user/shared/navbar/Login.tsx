'use client'
import React from 'react'
import { login } from '@/actions/auth'

const SignIn = () => {
  return (
    <div>
      <button onClick={() => login("google")}>
        sign in using google
      </button>
    </div>
  )
}

export default SignIn