import {useContext,React} from 'react';
import Admin from './AdminPages/Admin';
import Student from './Student';
import Teacher from './Teacher';
import AuthContext from '../store/auth-context';

export default function Home() {
    const AuthCtx = useContext(AuthContext);
    return (
        <div className="Home" >
            {AuthCtx.data.isAdmin ? <Admin /> : AuthCtx.data.isTeacher ? <Teacher /> : <Student />}
        </div>
    );
}