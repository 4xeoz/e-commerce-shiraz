import React from 'react'
import { auth } from '@/auth/auth'
import Logout from './Logout'
import SignIn from './Login'

const Links = async () => {
    const session = await auth()
  return (
    <div>
        <div>link</div>
        {session?.user? (
            <div>
                <Logout />
                {session?.user?.email}
            </div>
        ):(
            <div>
                <SignIn />
            </div>
        )}

        

    </div>
  )
}

export default Links