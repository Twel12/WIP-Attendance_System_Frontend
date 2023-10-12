import React from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import SignUpForm from '../../components/AddUser/AddUser';

const Admin = () => {
    return (
        <div className="Admin">
            <AdminSidebar />
            <div style={{paddingLeft:"300px",paddingTop:"20px"}}>
                <SignUpForm />
            </div>
        </div>
    );
}
export default Admin;