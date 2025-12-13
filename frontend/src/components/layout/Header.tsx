import React from 'react';
import { Link } from 'react-router-dom';
import { SiSublimetext } from 'react-icons/si';
import { useAppSelector } from '../../hooks/useRedux';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { logout } = useAuth();

    return (
        <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-saffron-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/home" className="flex items-center space-x-3 group">
                        <div className="text-5xl text-saffron-600 group-hover:scale-110 transition-transform select-none">
                            <SiSublimetext />
                        </div>
                        <div className="select-none">
                            <h1 className="text-2xl font-bold gradient-text">Sweet Shop</h1>
                            <p className="text-xs text-saffron-700 font-medium">Delicious Treats for Everyone</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="px-6 py-2 text-royal-700 font-semibold hover:text-saffron-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="px-6 py-2 text-royal-600 font-semibold hover:text-royal-800 transition-colors"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <div className="flex items-center gap-3 px-4 py-2 bg-saffron-50 rounded-lg border border-saffron-100">
                                    <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-royal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">
                                        {user?.firstName} {user?.lastName}
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-6 py-2 text-royal-700 font-semibold hover:text-saffron-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary"
                                >
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
