import React, { useState } from 'react';
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
                    <thead className="bg-gradient-to-r from-saffron-500 to-royal-500 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">Name</th>
                            <th className="px-4 py-3 text-left font-semibold">Category</th>
                            <th className="px-4 py-3 text-left font-semibold">Price</th>
                            <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                            <th className="px-4 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sweets.map((sweet) => (
                            <tr key={sweet._id} className="hover:bg-saffron-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-800">{sweet.name}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 bg-royal-100 text-royal-700 rounded-full text-xs font-semibold">
                                        {sweet.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-semibold text-gray-700">₹{sweet.price.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`font-semibold ${sweet.quantity === 0 ? 'text-red-600' : 'text-gray-700'
                                            }`}
                                    >
                                        {sweet.quantity}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(sweet)}
                                            className="px-3 py-1 bg-royal-600 text-white rounded-lg hover:bg-royal-700 text-sm font-semibold transition-all"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setRestockModal(sweet)}
                                            className="px-3 py-1 bg-pistachio-600 text-white rounded-lg hover:bg-pistachio-700 text-sm font-semibold transition-all"
                                        >
                                            Restock
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(sweet._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-semibold transition-all"
                                        >
                                            Delete
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
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this sweet? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-secondary">
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 btn-danger"
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Restock Modal */}
            {restockModal && (
                <div className="modal-overlay" onClick={() => setRestockModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold gradient-text mb-4">Restock {restockModal.name}</h2>
                        <div className="mb-6">
                            <p className="text-gray-600 mb-4">
                                Current Quantity: <span className="font-semibold">{restockModal.quantity}</span>
                            </p>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quantity to Add
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={restockQuantity}
                                onChange={(e) => setRestockQuantity(e.target.value)}
                                className="input-field"
                                placeholder="Enter quantity"
                            />
                            {restockQuantity && (
                                <p className="text-sm text-gray-600 mt-2">
                                    New Total:{' '}
                                    <span className="font-semibold">
                                        {restockModal.quantity + parseInt(restockQuantity)}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setRestockModal(null);
                                    setRestockQuantity('');
                                }}
                                className="flex-1 btn-secondary"
                                disabled={restockMutation.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRestock}
                                className="flex-1 btn-primary"
                                disabled={restockMutation.isPending || !restockQuantity}
                            >
                                {restockMutation.isPending ? 'Restocking...' : 'Confirm Restock'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SweetTable;
