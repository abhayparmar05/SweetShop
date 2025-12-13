import React, { useState } from 'react';
import type { Sweet } from '../../types/sweet.types';
import { usePurchaseSweet } from '../../hooks/useSweets';
import { FaCheckCircle } from 'react-icons/fa'; // Import the checkmark icon

interface SweetCardProps {
    sweet: Sweet;
}

interface PurchaseDetails {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet }) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);
    const [quantity, setQuantity] = useState(1);
    const purchaseMutation = usePurchaseSweet();

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            chocolate: 'bg-amber-100 text-amber-700',
            'swiss-western': 'bg-purple-100 text-purple-700',
            festival: 'bg-rose-100 text-rose-700',
            'premium-dry-fruit': 'bg-orange-100 text-orange-700',
            'regional-traditional': 'bg-green-100 text-green-700',
            other: 'bg-gray-100 text-gray-700',
        };
        return colors[category] || colors.other;
    };

    const handlePurchase = () => {
        const details: PurchaseDetails = {
            name: sweet.name,
            quantity: quantity,
            price: sweet.price,
            total: sweet.price * quantity,
        };

        purchaseMutation.mutate(
            { id: sweet._id, data: { quantity } },
            {
                onSuccess: () => {
                    setPurchaseDetails(details);
                    setShowPurchaseModal(false);
                    setShowSuccessModal(true);
                    setQuantity(1);
                },
            }
        );
    };

    const handleContinueShopping = () => {
        setShowSuccessModal(false);
        setPurchaseDetails(null);
    };

    return (
        <>
            <div className="sweet-card p-6 overflow-hidden">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                            sweet.category
                        )}`}
                    >
                        {sweet.category}
                    </span>
                    {sweet.quantity === 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Sweet Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{sweet.name}</h3>

                {/* Price */}
                <div className="mb-4">
                    <span className="text-3xl font-bold gradient-text">₹{sweet.price.toFixed(2)}</span>
                </div>

                {/* Quantity Available */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Available: <span className="font-semibold text-gray-800">{sweet.quantity}</span>
                    </p>
                </div>

                {/* Purchase Button */}
                <button
                    onClick={() => setShowPurchaseModal(true)}
                    disabled={sweet.quantity === 0}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${sweet.quantity === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'btn-primary'
                        }`}
                >
                    {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                </button>
            </div>

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <div className="modal-overlay" onClick={() => setShowPurchaseModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold gradient-text mb-4">Purchase {sweet.name}</h2>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">
                                Price: <span className="font-semibold">₹{sweet.price.toFixed(2)}</span>
                            </p>
                            <p className="text-gray-600 mb-4">
                                Available: <span className="font-semibold">{sweet.quantity}</span>
                            </p>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                max={sweet.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="input-field"
                            />

                            <div className="mt-4 p-4 bg-saffron-50 rounded-xl">
                                <p className="text-lg font-bold text-gray-800">
                                    Total: ₹{(sweet.price * quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPurchaseModal(false)}
                                className="flex-1 btn-secondary"
                                disabled={purchaseMutation.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePurchase}
                                className="flex-1 btn-primary"
                                disabled={purchaseMutation.isPending}
                            >
                                {purchaseMutation.isPending ? 'Processing...' : 'Confirm Purchase'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Confirmation Modal */}
            {showSuccessModal && purchaseDetails && (
                <div className="modal-overlay" onClick={handleContinueShopping}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Success Icon */}
                        <div className="text-center mb-6">
                            <div className="inline-block text-7xl mb-4 text-green-500 animate-bounce-slow"><FaCheckCircle /></div>
                            <h2 className="text-3xl font-bold gradient-text mb-2">Order Successful!</h2>
                            <p className="text-gray-600">Your order has been placed successfully</p>
                        </div>

                        {/* Order Details */}
                        <div className="bg-gradient-to-r from-saffron-50 to-royal-50 rounded-xl p-6 mb-6 border border-saffron-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Details</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Item:</span>
                                    <span className="font-semibold text-gray-800">{purchaseDetails.name}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Quantity:</span>
                                    <span className="font-semibold text-gray-800">{purchaseDetails.quantity}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Unit Price:</span>
                                    <span className="font-semibold text-gray-800">₹{purchaseDetails.price.toFixed(2)}</span>
                                </div>

                                <div className="border-t border-saffron-300 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                                        <span className="text-2xl font-bold gradient-text">₹{purchaseDetails.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={handleContinueShopping}
                            className="w-full btn-primary py-3 text-lg"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SweetCard;
