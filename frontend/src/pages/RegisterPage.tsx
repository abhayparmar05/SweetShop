import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../hooks/useRedux';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PasswordInput from '../components/common/PasswordInput';

const RegisterPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const isAdminRoute = location.pathname === '/register/admin';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState<'user' | 'admin'>(isAdminRoute ? 'admin' : 'user');
    const [errors, setErrors] = useState<{ email?: string; password?: string; firstName?: string; lastName?: string }>({});

    const { register, isRegisterLoading } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/shop', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Update role when route changes
    useEffect(() => {
        setRole(isAdminRoute ? 'admin' : 'user');
    }, [isAdminRoute]);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string; firstName?: string; lastName?: string } = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            register({ email, password, firstName, lastName, role });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-cream-50">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8 select-none">
                    <div className="mb-4 animate-bounce-slow flex justify-center pointer-events-none">
                        {isAdminRoute ? (
                            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#be185d', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12 2L4 6V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V6L14 2H12Z"
                                    fill="url(#shieldGradient)"
                                />
                                <path
                                    d="M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                                    fill="white"
                                />
                            </svg>
                        ) : (
                            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="userGradientReg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#be185d', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                    fill="url(#userGradientReg)"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                                    stroke="url(#userGradientReg)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                    <h1 className="heading-1 gradient-text mb-2">
                        {isAdminRoute ? 'Admin Registration' : 'Join Sweet Shop!'}
                    </h1>
                    <p className="text-gray-600 text-body">
                        {isAdminRoute
                            ? 'Create an admin account with full privileges'
                            : 'Create your account to start ordering sweets'}
                    </p>
                </div>

                {/* Register Form */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* First Name Field */}
                        <div>
                            <label htmlFor="firstName" className="block text-small font-semibold text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                                placeholder="John"
                            />
                            {errors.firstName && <p className="text-red-500 text-small mt-1">{errors.firstName}</p>}
                        </div>

                        {/* Last Name Field */}
                        <div>
                            <label htmlFor="lastName" className="block text-small font-semibold text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                                placeholder="Doe"
                            />
                            {errors.lastName && <p className="text-red-500 text-small mt-1">{errors.lastName}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-small font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-small mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <PasswordInput
                                id="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                error={errors.password}
                            />
                            <p className="text-tiny text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>

                        {/* Account Type Display */}
                        {/* Account Type Display Removed as per request */}
                        {/* {isAdminRoute && (
                            <div className="bg-royal-50 border-2 border-royal-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">👑</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Admin Account</p>
                                        <p className="text-sm text-gray-600">Full access to manage users and sweets</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isAdminRoute && (
                            <div className="bg-pistachio-50 border-2 border-pistachio-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">👤</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">User Account</p>
                                        <p className="text-sm text-gray-600">Browse and purchase delicious sweets</p>
                                    </div>
                                </div>
                            </div>
                        )} */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isRegisterLoading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isRegisterLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-body">
                            Already have an account?{' '}
                            <Link to="/login" className="text-saffron-600 font-semibold hover:underline">
                                Login here
                            </Link>
                        </p>
                        {!isAdminRoute && (
                            <p className="text-gray-600 text-small mt-2">
                                Need admin access?{' '}
                                <Link to="/register/admin" className="text-royal-600 font-semibold hover:underline">
                                    Register as Admin
                                </Link>
                            </p>
                        )}
                        {isAdminRoute && (
                            <p className="text-gray-600 text-small mt-2">
                                Want a regular account?{' '}
                                <Link to="/register" className="text-saffron-600 font-semibold hover:underline">
                                    Register as User
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

