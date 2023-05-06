import React from 'react';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import SignUpForm from '../components/AddUser/AddUser';
import AddSubject from '../components/AddSubject/AddSubject';
import Header from '../components/Header/Header';
const Admin2 = () => {
    return (
        <div className="Admin">
            <Header></Header>
            <AdminSidebar />
            <div style={{paddingLeft:"300px",paddingTop:"20px"}}>
                <AddSubject />
            </div>
        </div>
    );
}
export default Admin2;