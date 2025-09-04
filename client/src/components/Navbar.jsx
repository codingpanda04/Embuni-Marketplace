import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Heart, ShieldCheck } from "lucide-react"; // lucide-react heart icon
import { useAppContext } from "../context/AppContext";

const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Rentals', path: '/rentals' },
        { name: 'Gossip', path: '/gossip' },
        { name: 'Pricing', path: '/pricing' }
    ];


    const {user, isSeller} = useAppContext();

    const userId = user?.id || null; // Get user ID from context or set to null if not available
    const isAdmin = user?.id === 'user_31UysTxCeN1E3DbHNMDj7aeUQqL';

    

    const ref = useRef(null);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(1); // default count = 1
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current.scrollY > 10);
        };
        ref.current.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={ref} className="h-88 md:h-64 overflow-y-hidden">
            <p className="w-10 h-[500px]"></p>
            <nav className={`fixed top-0 left-0 bg-indigo-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to='/' className="flex items-center gap-2">
                    <img src={assets.Navlogo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                    <p>EMBUNI MARKETPLACE</p>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}

                    {user && <button onClick={() => isSeller ? navigate('/sell') : navigate('auth/sales/register')} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                        {isSeller ? 'Dashboard' : 'For Sellers'}
                    </button>}
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Search */}
                    <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    {/* Favorites / Cart */}
                    <div className="relative cursor-pointer">
                        <Heart
                            className={`h-6 w-6 transition-all duration-500 ${isScrolled ? "text-gray-700" : "text-white"}`}
                            onClick={() => navigate('/favorites')} // increase count
                        />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {favoritesCount}
                        </span>
                    </div>

                    {!user ? (
                        <button onClick={() => navigate("/login")} className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                            Login
                        </button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                               <UserButton.Action label='Profile' labelIcon={<BookIcon/>} onClick={()=> navigate(`/profile/${userId}`)}/>
                               {isAdmin && <UserButton.Action label='admin' labelIcon={<ShieldCheck className="w-4 h-4 text-gray-700"/>} onClick={()=> navigate('/admin')} />}
                            </UserButton.MenuItems>
                        </UserButton>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    {/* Mobile Favorites */}
                    <div className="relative cursor-pointer">
                        <Heart
                            className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`}
                            onClick={() => navigate('/favorites')}
                        />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {favoritesCount}
                        </span>
                    </div>

                    <UserButton className={`h-8 w-8 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        <UserButton.MenuItems>
                               <UserButton.Action label='Profile' labelIcon={<BookIcon/>} onClick={()=> navigate(`/profile/${userId}`)}/>
                               {isAdmin && <UserButton.Action label='admin' labelIcon={<ShieldCheck className="w-4 h-4 text-gray-700"/>} onClick={()=> navigate('/admin')} />}
                            </UserButton.MenuItems>
                    </UserButton>
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    {user && <button onClick={() => {isSeller ? navigate('/sell') : navigate('auth/sales/register'); setIsMenuOpen(false); }} className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        {isSeller ? 'Dashboard' : 'For Sellers'}
                    </button>}

                    {!user && <button onClick={() => {navigate('/login'); setIsMenuOpen(false); }} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
