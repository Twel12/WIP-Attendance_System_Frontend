import {useContext,React} from 'react';
import './Home.css';
import Admin from './Admin';
import Header from '../components/Header/Header';
import Form from '../components/Form/Form';
import Student from './Student';
import Teacher from './Teacher';
import AuthContext from '../store/auth-context';

export default function Home() {
    const AuthCtx = useContext(AuthContext);
    return (
        <div className="Home" >
            <Header />
            {/* <Form /> */}
            {AuthCtx.data.isAdmin ? <Admin /> : AuthCtx.data.isTeacher ? <Teacher /> : <Student />}
        </div>
    );
}
