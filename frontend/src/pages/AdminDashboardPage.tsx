import React, { useState } from 'react';
import Header from '../components/layout/Header';
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cream-50 to-saffron-50">
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-saffron-50 via-cream-50 to-rose-50 border-b border-saffron-100">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOTczMTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djJoLTh6bTAtMTZoOHYyaC04em0wLTE2aDh2MmgtOHptMC0xNmg4djJoLTh6bTAtMTZoOHYyaC04em0wLTE2aDh2MmgtOHpNMTggMTM0aDh2MmgtOHptMC0xNmg4djJoLTh6bTAtMTZoOHYyaC04em0wLTE2aDh2MmgtOHptMC0xNmg4djJoLTh6bTAtMTZoOHYyaC04ek0wIDEzNGg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHptMC0xNmg4djJIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                    <div className="text-center">
                        <h1 className="heading-1 mb-2">
                            <span className="gradient-text">Admin Dashboard</span>
                        </h1>
                        <p className="text-gray-600 text-body">
                            Manage your sweet shop inventory and user accounts
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('sweets')}
                                className={`pb-4 px-1 border-b-2 font-medium transition-colors text-body ${activeTab === 'sweets'
                                    ? 'border-saffron-500 text-saffron-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Sweets Management
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`pb-4 px-1 border-b-2 font-medium transition-colors text-body ${activeTab === 'users'
                                    ? 'border-royal-500 text-royal-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                User Management
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Sweets Tab Content */}
                {activeTab === 'sweets' && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-small text-gray-600 mb-1">Total Sweets</p>
                                <p className="heading-2 text-gray-900">{statsData?.data?.total || 0}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-small text-gray-600 mb-1">In Stock</p>
                                <p className="heading-2 text-green-600">
                                    {statsData?.data?.inStock || 0}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-small text-gray-600 mb-1">Out of Stock</p>
                                <p className="heading-2 text-red-600">
                                    {statsData?.data?.outOfStock || 0}
                                </p>
                            </div>
                        </div>

                        {/* Sweets Table */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="heading-3 text-gray-900">Sweet Inventory</h2>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="btn-primary"
                                >
                                    Add New Sweet
                                </button>
                            </div>
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
                                <div className="space-y-4">
                                    <SweetTable sweets={sweets} onEdit={setEditingSweet} />
                                    {sweetsData?.pagination && (
                                        <div className="mt-6">
                                            <Pagination
                                                currentPage={page}
                                                totalPages={sweetsData.pagination.pages}
                                                onPageChange={setPage}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Users Tab Content */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-small text-gray-600 mb-1">Total Users</p>
                                <p className="heading-2 text-gray-900">{users.length}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-small text-gray-600 mb-1">Admins</p>
                                <p className="heading-2 text-royal-600">
                                    {users.filter((u) => u.role === 'admin').length}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-small text-gray-600 mb-1">Regular Users</p>
                                <p className="heading-2 text-pistachio-600">
                                    {users.filter((u) => u.role === 'user').length}
                                </p>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="heading-3 text-gray-900 mb-6">User Management</h2>
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
                    </div>
                )}
            </div>

            {/* Create Sweet Modal */}
            {showCreateModal && (
                <div className="modal-overlay backdrop-blur-md" onClick={() => setShowCreateModal(false)}>
                    <div className="relative max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="heading-3 gradient-text mb-6">Add New Sweet</h2>
                            <SweetForm
                                mode="create"
                                onSubmit={handleCreateSweet}
                                onCancel={() => setShowCreateModal(false)}
                                isLoading={createMutation.isPending}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Sweet Modal */}
            {editingSweet && (
                <div className="modal-overlay backdrop-blur-md" onClick={() => setEditingSweet(null)}>
                    <div className="relative max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="heading-3 gradient-text mb-6">Edit Sweet</h2>
                            <SweetForm
                                mode="edit"
                                initialData={editingSweet}
                                onSubmit={handleUpdateSweet}
                                onCancel={() => setEditingSweet(null)}
                                isLoading={updateSweetMutation.isPending}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {editingUser && (
                <div className="modal-overlay backdrop-blur-md" onClick={() => setEditingUser(null)}>
                    <div className="relative max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="heading-3 gradient-text mb-6">Edit User</h2>
                            <UserForm
                                user={editingUser}
                                onSubmit={handleUpdateUser}
                                onCancel={() => setEditingUser(null)}
                                isLoading={updateUserMutation.isPending}
                            />
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AdminDashboardPage;
