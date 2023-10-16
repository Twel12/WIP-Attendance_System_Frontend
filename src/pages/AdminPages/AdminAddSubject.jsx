import React from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AddSubject from '../../components/AddSubject/AddSubject';
import Header from '../../components/Header/Header';

const Admin = () => {
    return (
        <div className="Admin">
            <AdminSidebar />
            <div style={{paddingLeft:"300px",paddingTop:"20px"}}>
                <AddSubject />
            </div>
        </div>
    );
}
export default Admin;