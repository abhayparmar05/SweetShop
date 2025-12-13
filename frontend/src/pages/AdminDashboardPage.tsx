import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SweetTable from '../components/admin/SweetTable';
import SweetForm from '../components/admin/SweetForm';
import UserTable from '../components/admin/UserTable';
import UserForm from '../components/admin/UserForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import { useSweets, useCreateSweet, useUpdateSweet, useSweetStats } from '../hooks/useSweets';
import { useUsers, useUpdateUser } from '../hooks/useUsers';
import type { Sweet, CreateSweetData, UpdateSweetData } from '../types/sweet.types';
import type { User } from '../types/user.types';
import type { UpdateUserData } from '../api/users.api';

type TabType = 'sweets' | 'users';

const AdminDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('sweets');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [page, setPage] = useState(1);

    // Sweets data
    const { data: sweetsData, isLoading: sweetsLoading } = useSweets(page, 10);
    const { data: statsData } = useSweetStats();
    const createMutation = useCreateSweet();
    const updateSweetMutation = useUpdateSweet();

    // Users data
    const { data: usersData, isLoading: usersLoading } = useUsers();
    const updateUserMutation = useUpdateUser();

    const sweets = sweetsData?.data || [];
    const users = usersData?.data || [];

    const handleCreateSweet = (formData: CreateSweetData) => {
        createMutation.mutate(formData, {
            onSuccess: () => setShowCreateModal(false),
        });
    };

    const handleUpdateSweet = (formData: UpdateSweetData) => {
        if (editingSweet) {
            updateSweetMutation.mutate(
                { id: editingSweet._id, data: formData },
                {
                    onSuccess: () => setEditingSweet(null),
                }
            );
        }
    };

    const handleUpdateUser = (formData: UpdateUserData) => {
        if (editingUser) {
            updateUserMutation.mutate(
                { userId: editingUser.id, data: formData },
                {
                    onSuccess: () => setEditingUser(null),
                }
            );
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="select-none">
                        <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Manage your sweet shop and users</p>
                    </div>
                    {activeTab === 'sweets' && (
                        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                            + Add New Sweet
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 border-b-2 border-gray-200 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('sweets')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${activeTab === 'sweets'
                            ? 'border-b-4 border-saffron-500 text-saffron-600'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        🍬 Sweets Management
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${activeTab === 'users'
                            ? 'border-b-4 border-royal-500 text-royal-600'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        👥 User Management
                    </button>
                </div>

                {/* Sweets Tab Content */}
                {activeTab === 'sweets' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="card p-6">
                                <p className="text-gray-600 text-sm font-semibold mb-1">Total Sweets</p>
                                <p className="text-3xl font-bold gradient-text">{statsData?.data?.total || 0}</p>
                            </div>
                            <div className="card p-6">
                                <p className="text-gray-600 text-sm font-semibold mb-1">In Stock</p>
                                <p className="text-3xl font-bold text-pistachio-600">
                                    {statsData?.data?.inStock || 0}
                                </p>
                            </div>
                            <div className="card p-6">
                                <p className="text-gray-600 text-sm font-semibold mb-1">Out of Stock</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {statsData?.data?.outOfStock || 0}
                                </p>
                            </div>
                        </div>

                        {/* Sweets Table */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sweet Inventory</h2>
                            {sweetsLoading ? (
                                <div className="py-12">
                                    <LoadingSpinner size="lg" />
                                </div>
                            ) : sweets.length === 0 ? (
                                <EmptyState
                                    title="No Sweets Yet"
                                    message="Start by adding your first sweet to the inventory!"
                                    actionLabel="Add Sweet"
                                    onAction={() => setShowCreateModal(true)}
                                />
                            ) : (
                                <>
                                    <SweetTable sweets={sweets} onEdit={setEditingSweet} />
                                    {sweetsData?.pagination && (
                                        <Pagination
                                            currentPage={page}
                                            totalPages={sweetsData.pagination.pages}
                                            onPageChange={setPage}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}

                {/* Users Tab Content */}
                {activeTab === 'users' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="card p-6">
                                <p className="text-gray-600 text-sm font-semibold mb-1">Total Users</p>
                                <p className="text-3xl font-bold gradient-text">{users.length}</p>
                            </div>
                            <div className="card p-6">
                                <p className="text-gray-600 text-sm font-semibold mb-1">Admins</p>
                                <p className="text-3xl font-bold text-royal-600">
                                    {users.filter((u) => u.role === 'admin').length}
                                </p>
                            </div>
                            <div className="card p-6">
                                <p className="text-gray-600 text-sm font-semibold mb-1">Regular Users</p>
                                <p className="text-3xl font-bold text-pistachio-600">
                                    {users.filter((u) => u.role === 'user').length}
                                </p>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
                            {usersLoading ? (
                                <div className="py-12">
                                    <LoadingSpinner size="lg" />
                                </div>
                            ) : users.length === 0 ? (
                                <EmptyState
                                    title="No Users Yet"
                                    message="No users have registered yet."
                                />
                            ) : (
                                <UserTable users={users} onEdit={setEditingUser} />
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Create Sweet Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold gradient-text mb-6">Add New Sweet</h2>
                        <SweetForm
                            mode="create"
                            onSubmit={handleCreateSweet}
                            onCancel={() => setShowCreateModal(false)}
                            isLoading={createMutation.isPending}
                        />
                    </div>
                </div>
            )}

            {/* Edit Sweet Modal */}
            {editingSweet && (
                <div className="modal-overlay" onClick={() => setEditingSweet(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold gradient-text mb-6">Edit Sweet</h2>
                        <SweetForm
                            mode="edit"
                            initialData={editingSweet}
                            onSubmit={handleUpdateSweet}
                            onCancel={() => setEditingSweet(null)}
                            isLoading={updateSweetMutation.isPending}
                        />
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {editingUser && (
                <div className="modal-overlay" onClick={() => setEditingUser(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold gradient-text mb-6">Edit User</h2>
                        <UserForm
                            user={editingUser}
                            onSubmit={handleUpdateUser}
                            onCancel={() => setEditingUser(null)}
                            isLoading={updateUserMutation.isPending}
                        />
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AdminDashboardPage;
