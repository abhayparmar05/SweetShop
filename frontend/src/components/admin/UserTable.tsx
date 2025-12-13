import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { User } from '../../types/user.types';
import { useDeleteUser } from '../../hooks/useUsers';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
    const deleteMutation = useDeleteUser();
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleDelete = (userId: string) => {
        deleteMutation.mutate(userId, {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const getRoleBadge = (role: string) => {
        if (role === 'admin') {
            return (
                <span className="px-2 py-1 bg-royal-100 text-royal-700 rounded-full text-xs font-medium">
                    Admin
                </span>
            );
        }
        return (
            <span className="px-2 py-1 bg-pistachio-100 text-pistachio-700 rounded-full text-xs font-medium">
                User
            </span>
        );
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                                <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                                <td className="px-4 py-3 text-gray-700">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                Edit
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(user.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="modal-overlay backdrop-blur-md" onClick={() => setDeleteConfirm(null)}>
                    <div className="relative max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold gradient-text mb-4">Confirm Delete</h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this user? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all"
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : '✓ Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserTable;
