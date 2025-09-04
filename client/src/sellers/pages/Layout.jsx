import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';


const Layout = () => {

    const {isSeller} = useAppContext();
    const navigate = useNavigate();

    return isSeller ? (
        <div className='flex flex-col h-screen'>
           <NavBar />

           <div className='flex h-full'>
            <SideBar />
            <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                <Outlet />
            </div>
           </div>
        </div>
    ) : (
        toast.error("You need to register as a seller to access this page"),
        navigate('/auth/sales/register', { replace: true })
    )
};

export default Layout;