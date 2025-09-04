import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.CURRENCY || 'ksh';
    const {user} = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [isSeller, setIsSeller] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true); // NEW
    const [products, setProducts] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [sellers, setSellers] = useState([]);
    const [gossips, setGossips] = useState([]);
    const [favorites, setFavorites] = useState([]);

    
    
    const fetchProducts = async () => {
        try {
            const {data} = await axios.get('/api/products/all');
            if(data.success) {
                setProducts(data.products);
                console.log(data.products);
            }
            else {
                toast.error(data.message);
                console.log(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message)
        }
    }

    const fetchRentals = async () => {
        try {
            const {data} = await axios.get('/api/rentals/all');
            if(data.success) {
                setRentals(data.rentals);
                console.log(data.rentals);
            }
            else {
                toast.error(data.message);
                console.log(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const fetchUser = async () => {
        try {
            setLoadingUser(true);
            const response = await axios.get('/api/user', {
            headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (response.data.success) {
            setIsSeller(response.data.role === "seller");
            setFollowing(response.data.following || []);
            setIsAdmin(user?.publicMetadata?.role === 'admin');
            } else {
            setTimeout(fetchUser, 5000);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingUser(false);
        }
    }


    const fetchAllSellers = async ()=> {
        try{
            const {data} = await axios.get('/api/seller/all', {headers: {
                Authorization: `Bearer ${await getToken()}`
            }});

            if(data.success){
                console.log(data.sellers);
                setSellers(data.sellers);
            } else{
                toast.error(data.message);
            }
        } catch(error){
            toast.error(error.message);
        }
    }

    const fetchGossip = async ()=> {
        try {
            const {data} = await axios.get('/api/gossip/all', {headers: {
                Authorization: `Bearer ${await getToken()}`
            }});

            if(data.success){
                setGossips(data.gossips);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchFavorites = async () => {
        try {
            const {data} = await axios.get('/api/favorites/mine', {headers: {
                Authorization: `Bearer ${await getToken()}`
            }});

            if(data.success){
                setFavorites(data.favorites);
            } else{
                toast.error(data.message);
            }
        } catch(error){
            toast.error(error.message);
        }
    }


    useEffect(() => {
        if(user) {
            fetchUser();
            fetchFavorites();
        } else {
            setLoadingUser(false); // user is definitely null
        }
    }, [user])

    useEffect(() => {
        fetchProducts();
        fetchRentals();
        fetchAllSellers();
        fetchGossip();
    }, [])

    const value = {
        currency,
        user,
        getToken,
        navigate,
        isSeller,
        setIsSeller,
        axios,
        loadingUser,
        fetchUser,
        products,
        setProducts,
        rentals,
        setRentals,
        fetchProducts,
        following,
        isAdmin,
        sellers,
        gossips,
        favorites,
        fetchGossip,
    }

    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);