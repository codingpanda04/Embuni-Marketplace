import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Footer from './components/Footer';
import Products from './pages/Products';
import Rentals from './pages/Rentals';
import Gossip from './pages/Gossip';
import GossipDetails from './pages/GossipDetails';
import ProductDetails from './pages/ProductDetails';
import RentalDetails from './pages/RentalDetails';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import { ToastContainer } from 'react-toastify';
import SellerSignUp from './pages/SellerSignUp';
import Layout from './sellers/pages/Layout';
import Dashboard from './sellers/pages/Dashboard';
import CreateProduct from './sellers/pages/CreateProduct';
import CreateRental from './sellers/pages/CreateRental';
import Manage from './sellers/pages/Manage';
import SellerProfile from './sellers/pages/Profile';
import { useAppContext } from './context/AppContext';
import AdminLayout from './admin/pages/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AddGossip from './admin/pages/AddGossip';
import ManageGossip from './admin/pages/ManageGossip';

const App = ()=> {

  const isSellerRoute = useLocation().pathname.includes('/sell');
  const isAdminRoute = useLocation().pathname.includes('/admin');
  const {isSeller} = useAppContext();

  return (
    <>
    {!isSellerRoute && !isAdminRoute && <Navbar />}
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='products' element={<Products />} />
      <Route path='products/:id' element={<ProductDetails />} />
      <Route path='rentals' element={<Rentals />} />
      <Route path='rentals/:id' element={<RentalDetails />} />  
      <Route path='gossip' element={<Gossip />} />
      <Route path='gossip/:id' element={<GossipDetails />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='profile/:id' element={<Profile />} />
      <Route path='login' element={<Login />} />
      <Route path='auth/sales/register' element={<SellerSignUp />} />
      <Route path='favorites' element={<Favorites />} />
      <Route path='*' element={<Notfound/>} />


      <Route path='sell' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='add-product' element={<CreateProduct />} />
        <Route path='add-rental' element={<CreateRental />} />
        <Route path='manage-products-and-rentals' element={<Manage />} />
        <Route path='profile' element={<SellerProfile />} />
      </Route>

      <Route path='admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path='add-gossip' element={<AddGossip />} />
        <Route path='manage-gossip' element={<ManageGossip />} />
        <Route path='*' element={<Notfound />} />
      </Route>

    </Routes>

    
    {!isSellerRoute && <Footer />}

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </>
  );
};

export default App;