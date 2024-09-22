import React from 'react'
import { auth } from '@/auth/auth'

const page =async () => {
  const session = await auth();
  console.log(session)
  return (
    <div>page admin</div>
  )
}

export default page