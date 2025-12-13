import React, { useState } from 'react';
import type { UpdateSweetData, SweetCategory } from '../../types/sweet.types';


interface SweetFormProps {
    initialData?: UpdateSweetData & { _id?: string };
    onSubmit: (data: any) => void;
    onCancel: () => void;
    isLoading?: boolean;
    mode: 'create' | 'edit';
}

const SweetForm: React.FC<SweetFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isLoading,
    mode,
}) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        category: (initialData?.category || 'chocolate') as SweetCategory,
        price: initialData?.price?.toString() || '',
        quantity: initialData?.quantity?.toString() || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const categories: SweetCategory[] = [
        'chocolate',
        'swiss-western',
        'festival',
        'premium-dry-fruit',
        'regional-traditional',
    ];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price < 0) {
            newErrors.price = 'Price must be a positive number';
        }

        const quantity = parseInt(formData.quantity);
        if (isNaN(quantity) || quantity < 0) {
            newErrors.quantity = 'Quantity must be a non-negative integer';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sweet Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="e.g., Chocolate Bar"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as SweetCategory })}
                    className="input-field"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`input-field ${errors.price ? 'border-red-500' : ''}`}
                    placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Quantity */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className={`input-field ${errors.quantity ? 'border-red-500' : ''}`}
                    placeholder="0"
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                <button type="button" onClick={onCancel} className="flex-1 btn-secondary" disabled={isLoading}>
                    Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : mode === 'create' ? 'Create Sweet' : 'Update Sweet'}
                </button>
            </div>
        </form>
    );
};

export default SweetForm;
