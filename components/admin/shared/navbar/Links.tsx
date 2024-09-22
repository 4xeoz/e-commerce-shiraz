
import Login from '../../../user/shared/navbar/Login'
import Logout from '../../../user/shared/navbar/Logout'
import { auth } from '@/auth/auth'
import NavLinkAdmin from './NavLinkAdmin'

const Links = async () => {
    const session = await auth();
  return (
    <div >
        <NavLinkAdmin/>
        <AuthButtonController session={session}/>
    </div>
  )
}

export default Links


const AuthButtonController = ({session}: any) => {
    return (
        session?.user ? (
            <div>
                <Logout/>
                {session?.user?.email}
            </div>
        ) : (
            <div>

                <Login />
            </div>
        )
    );
};


