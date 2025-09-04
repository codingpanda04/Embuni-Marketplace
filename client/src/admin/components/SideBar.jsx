import React from 'react';
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom';

const SideBar = () => {

    const sideBarLinks = [
        {name: "Dashboard", path: "/admin", icon: assets.dashboardIcon},
        {name: "Add Gossip", path: "/admin/add-gossip", icon: assets.addIcon},
        {name: "Manage Gossip", path: "/admin/manage-gossip", icon: assets.listIcon},
        {name: "Sellers", path: "/admin/premium-sellers", icon: assets.profileIcon},
    ]

    return (
        <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
             {sideBarLinks.map((link, index) => (
                <NavLink to={link.path} key={index} end='/owner' className={({isActive})=> `flex items-center py-3 px-4 md:px-8 gap-3 ${isActive ? 'border-r-4 md:border-r-[6px] bg-blue-600/60 border-blue-600 text-blue-600' : 'hover:bg-gray-100/90 border-white text-gray-700'}`}>
                    <img src={link.icon} alt={link.name} className='h-6 w-6 object-contain' />
                    <p className='md:block hidden text-center'>{link.name}</p>
                </NavLink>
             ))}
        </div>
    );
};

export default SideBar;