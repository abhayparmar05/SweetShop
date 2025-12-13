import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPackage } from 'react-icons/fi';
import type { Sweet } from '../../types/sweet.types';
import { useDeleteSweet, useRestockSweet } from '../../hooks/useSweets';

interface SweetTableProps {
    sweets: Sweet[];
    onEdit: (sweet: Sweet) => void;
}

const SweetTable: React.FC<SweetTableProps> = ({ sweets, onEdit }) => {
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [restockModal, setRestockModal] = useState<Sweet | null>(null);
    const [restockQuantity, setRestockQuantity] = useState('');

    const deleteMutation = useDeleteSweet();
    const restockMutation = useRestockSweet();

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id, {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const handleRestock = () => {
        if (restockModal && restockQuantity) {
            restockMutation.mutate(
                { id: restockModal._id, data: { quantity: parseInt(restockQuantity) } },
                {
                    onSuccess: () => {
                        setRestockModal(null);
                        setRestockQuantity('');
                    },
                }
            );
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sweets.map((sweet) => (
                            <tr key={sweet._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{sweet.name}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-saffron-100 text-saffron-700 rounded-full text-xs font-medium">
                                        {sweet.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">₹{sweet.price.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <span className={`font-medium ${sweet.quantity === 0 ? 'text-red-600' : 'text-gray-700'}`}>
                                        {sweet.quantity}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(sweet)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                Edit
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setRestockModal(sweet)}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group relative"
                                            title="Restock"
                                        >
                                            <FiPackage className="w-4 h-4" />
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                Restock
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(sweet._id)}
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
                                Are you sure you want to delete this sweet? This action cannot be undone.
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

            {/* Restock Modal */}
            {restockModal && (
                <div className="modal-overlay backdrop-blur-md" onClick={() => setRestockModal(null)}>
                    <div className="relative max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold gradient-text mb-4">Restock {restockModal.name}</h2>
                            <div className="mb-6 space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                    <span className="text-gray-600">Current Quantity:</span>
                                    <span className="font-bold text-gray-800 text-lg">{restockModal.quantity}</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Quantity to Add
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={restockQuantity}
                                        onChange={(e) => setRestockQuantity(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-400 focus:border-transparent outline-none transition-all text-lg"
                                        placeholder="Enter quantity"
                                    />
                                </div>
                                {restockQuantity && (
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="text-gray-800 font-semibold">New Total:</span>
                                        <span className="text-2xl font-bold gradient-text">
                                            {restockModal.quantity + parseInt(restockQuantity)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setRestockModal(null);
                                        setRestockQuantity('');
                                    }}
                                    className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
                                    disabled={restockMutation.isPending}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRestock}
                                    className="flex-1 bg-gradient-to-r from-saffron-500 to-royal-500 hover:from-saffron-600 hover:to-royal-600 text-white py-3 rounded-lg font-semibold transition-all"
                                    disabled={restockMutation.isPending || !restockQuantity}
                                >
                                    {restockMutation.isPending ? 'Restocking...' : '✓ Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SweetTable;
