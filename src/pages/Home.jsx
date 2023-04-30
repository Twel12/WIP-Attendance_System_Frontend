import React from 'react';
import './Home.css';
import Header from '../components/Header/Header';
import Student from './Student';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';


export default function Home() {
    const AuthCtx = useContext(AuthContext);
    function handleLogout() {
        AuthCtx.onLogout();
    }
    function consolelog() {
        console.log(AuthCtx.data);
    }
    return (
        <div className="Home">
            {/* logout */}
            <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
            <button type="button" className="btn btn-primary" onClick={consolelog}>Console.log </button>
            <Student></Student>
        </div>
    );
}
