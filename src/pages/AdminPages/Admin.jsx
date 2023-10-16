import React from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import SignUpForm from '../../components/AddUser/AddUser';
import { Box } from '@mui/material';

const Admin = () => {
    return (
        <Box className="Admin">
            <AdminSidebar />
            <Box style={{paddingLeft:"300px",paddingTop:"20px"}}>
                <SignUpForm />
            </Box>
        </Box>
    );
}
export default Admin;