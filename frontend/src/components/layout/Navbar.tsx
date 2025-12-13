import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiSublimetext } from 'react-icons/si';
import { useAppSelector } from '../../hooks/useRedux';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-40 border-b border-saffron-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2 select-none">
                        <span className="text-4xl text-saffron-600"><SiSublimetext /></span>
                        <span className="text-2xl font-bold gradient-text">Sweet Shop</span>
                    </Link>

                    {/* User Info & Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className="px-3 py-2 bg-royal-600 text-white rounded-lg hover:bg-royal-700 transition-all font-semibold flex items-center gap-2"
                                title="Admin Dashboard"
                            >
                                <span className="text-lg">🛡️</span>
                                <span className="hidden sm:inline">Admin Dashboard</span>
                            </Link>
                        )}

                        {/* User Menu */}
                        <div className="relative group/menu">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white hover:bg-saffron-50 rounded-full transition-all border border-gray-200 hover:border-saffron-200 shadow-sm hover:shadow-md group-hover/menu:ring-2 ring-saffron-100 ring-offset-1"
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-saffron-500 to-royal-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner text-sm border-2 border-white">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-sm font-bold text-gray-800 leading-tight">
                                        {user?.firstName}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                                        {user?.role}
                                    </p>
                                </div>
                                <span className={`text-gray-400 text-xs ml-1 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}>▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
                                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 overflow-hidden ring-1 ring-black ring-opacity-5">
                                        <div className="px-6 py-4 bg-gradient-to-r from-saffron-50 to-white border-b border-saffron-100">
                                            <p className="text-xs text-saffron-600 font-bold uppercase tracking-wider mb-1">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 truncate" title={user?.email}>{user?.email}</p>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-royal-600 transition-colors group"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <span className="text-xl group-hover:scale-110 transition-transform">🏠</span>
                                                <span className="font-medium">Dashboard</span>
                                            </Link>

                                            {user?.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-royal-600 transition-colors group"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <span className="text-xl group-hover:scale-110 transition-transform">🛡️</span>
                                                    <span className="font-medium">Admin Panel</span>
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
                                                <span className="text-xl group-hover:-translate-x-1 transition-transform">🚺</span>
                                                <span className="font-semibold">Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
