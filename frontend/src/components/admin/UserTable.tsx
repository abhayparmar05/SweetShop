import React, { useState } from 'react';
import type { User } from '../../types/user.types';
import { useDeleteUser } from '../../hooks/useUsers';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
    const deleteMutation = useDeleteUser();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setDeletingId(userId);
            deleteMutation.mutate(userId, {
                onSettled: () => setDeletingId(null),
            });
        }
    };

    const getRoleBadge = (role: string) => {
        if (role === 'admin') {
            return (
                <span className="px-3 py-1 bg-royal-100 text-royal-700 rounded-full text-xs font-semibold flex items-center space-x-1 w-fit">
                    <span>👑</span>
                    <span>Admin</span>
                </span>
            );
        }
        return (
            <span className="px-3 py-1 bg-pistachio-100 text-pistachio-700 rounded-full text-xs font-semibold flex items-center space-x-1 w-fit">
                <span>👤</span>
                <span>User</span>
            </span>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-saffron-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-saffron-50 transition-colors">
                            <td className="py-4 px-4">
                                <div className="font-semibold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{user.email}</td>
                            <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                            <td className="py-4 px-4 text-gray-600">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="px-4 py-2 bg-royal-600 text-white rounded-lg hover:bg-royal-700 transition-colors text-sm font-semibold"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        disabled={deletingId === user.id}
                                        className="btn-danger text-sm disabled:opacity-50"
                                    >
                                        {deletingId === user.id ? '⏳' : '🗑️'} Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
