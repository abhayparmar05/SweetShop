import React, { useState } from 'react';
import type { User } from '../../types/user.types';
import type { UpdateUserData } from '../../api/users.api';
import LoadingSpinner from '../common/LoadingSpinner';

interface UserFormProps {
    user: User;
    onSubmit: (data: UpdateUserData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel, isLoading = false }) => {
    const [formData, setFormData] = useState<UpdateUserData>({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    });

    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({});

    const validateForm = () => {
        const newErrors: { firstName?: string; lastName?: string; email?: string } = {};

        if (!formData.firstName?.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName?.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                </label>
                <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                </label>
                <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="user@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Role */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="user"
                            checked={formData.role === 'user'}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' })}
                            className="mr-2 w-4 h-4"
                        />
                        <span className="text-gray-700">👤 User</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' })}
                            className="mr-2 w-4 h-4"
                        />
                        <span className="text-gray-700">👑 Admin</span>
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="btn-secondary" disabled={isLoading}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};

export default UserForm;
