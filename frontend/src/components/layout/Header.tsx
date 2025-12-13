import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiSublimetext } from 'react-icons/si';
import { FiShoppingBag, FiLogOut, FiUserPlus, FiLogIn, FiShield } from 'react-icons/fi';
import { useAppSelector } from '../../hooks/useRedux';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-saffron-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="text-5xl text-saffron-600 group-hover:scale-110 transition-transform select-none">
                            <SiSublimetext />
                        </div>
                        <div className="select-none">
                            <h1 className="heading-3 gradient-text">Sweet Shop</h1>
                            <p className="text-tiny text-saffron-700 font-medium">Delicious Treats for Everyone</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                {/* Shop Link */}
                                <Link
                                    to="/shop"
                                    className="hidden md:flex items-center gap-2 px-6 py-2 text-royal-700 font-semibold hover:text-saffron-600 transition-colors"
                                >
                                    <FiShoppingBag className="text-lg" />
                                    Shop
                                </Link>

                                {/* Admin Link (Desktop) */}
                                {user?.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="hidden md:flex items-center gap-2 px-6 py-2 text-royal-600 font-semibold hover:text-royal-800 transition-colors"
                                    >
                                        <FiShield className="text-lg" />
                                        Admin
                                    </Link>
                                )}

                                {/* User Menu Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white hover:bg-saffron-50 rounded-full transition-all border border-gray-200 hover:border-saffron-200 shadow-sm hover:shadow-md"
                                    >
                                        <div className="w-9 h-9 bg-gradient-to-br from-saffron-500 to-royal-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner text-sm border-2 border-white">
                                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                                        </div>
                                        <div className="text-left hidden md:block">
                                            <p className="text-small font-bold text-gray-800 leading-tight">
                                                {user?.firstName}
                                            </p>
                                            <p className="text-tiny uppercase tracking-wider text-gray-500 font-semibold">
                                                {user?.role}
                                            </p>
                                        </div>
                                        <span className={`text-gray-400 text-xs ml-1 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}>▼</span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showUserMenu && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
                                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 transform origin-top-right transition-all overflow-hidden ring-1 ring-black ring-opacity-5">
                                                <div className="px-6 py-4 bg-gradient-to-r from-saffron-50 to-white border-b border-saffron-100">
                                                    <p className="text-tiny text-saffron-600 font-bold uppercase tracking-wider mb-1">Signed in as</p>
                                                    <p className="text-small font-bold text-gray-900 truncate" title={user?.email}>{user?.email}</p>
                                                </div>

                                                <div className="py-2">
                                                    <Link
                                                        to="/shop"
                                                        className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-royal-600 transition-colors group"
                                                        onClick={() => setShowUserMenu(false)}
                                                    >
                                                        <FiShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                                                        <span className="font-medium text-small">Shop</span>
                                                    </Link>

                                                    {user?.role === 'admin' && (
                                                        <Link
                                                            to="/admin"
                                                            className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-royal-600 transition-colors group"
                                                            onClick={() => setShowUserMenu(false)}
                                                        >
                                                            <FiShield className="text-xl group-hover:scale-110 transition-transform" />
                                                            <span className="font-medium text-small">Admin Panel</span>
                                                        </Link>
                                                    )}
                                                </div>

                                                <div className="border-t border-gray-100 mt-2 pt-2">
                                                    <button
                                                        onClick={() => {
                                                            setShowUserMenu(false);
                                                            logout();
                                                        }}
                                                        className="w-full flex items-center gap-3 px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                                                    >
                                                        <FiLogOut className="text-xl group-hover:-translate-x-1 transition-transform" />
                                                        <span className="font-semibold text-small">Sign Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-6 py-2 text-royal-700 font-semibold hover:text-saffron-600 transition-colors"
                                >
                                    <FiLogIn className="text-lg" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary flex items-center gap-2"
                                >
                                    <FiUserPlus className="text-lg" />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
