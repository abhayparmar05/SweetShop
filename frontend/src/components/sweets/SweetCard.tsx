import React, { useState } from 'react';
import type { Sweet } from '../../types/sweet.types';
import { usePurchaseSweet } from '../../hooks/useSweets';
import { FaCheckCircle } from 'react-icons/fa';

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
            <div className="sweet-card h-full flex flex-col">
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                    {/* Category and Stock Badge */}
                    <div className="flex justify-between items-start mb-3">
                        <span className="px-3 py-1 rounded-lg text-tiny font-semibold bg-saffron-100 text-saffron-700 capitalize">
                            {sweet.category.replace('-', ' ')}
                        </span>
                    </div>

                    {/* Sweet Name */}
                    <h3 className="heading-3 text-gray-800 mb-2 line-clamp-2">
                        {sweet.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                        <span className="heading-2 text-saffron-600">₹{sweet.price.toFixed(2)}</span>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    {/* Quantity Available */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600"></span>
                            <span className={`font-semibold text-small ${sweet.quantity > 10 ? 'text-green-600' : sweet.quantity > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                                {sweet.quantity > 0 ? `${sweet.quantity} available` : 'Out of stock'}
                            </span>
                        </div>
                    </div>

                    {/* Purchase Button */}
                    <button
                        onClick={() => setShowPurchaseModal(true)}
                        disabled={sweet.quantity === 0}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${sweet.quantity === 0
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'btn-primary'
                            }`}
                    >
                        {sweet.quantity === 0 ? 'Out of Stock' : 'Buy'}
                    </button>
                </div>
            </div>

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <div className="modal-overlay backdrop-blur-md" onClick={() => setShowPurchaseModal(false)}>
                    <div className="relative max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        {/* Modal content */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="heading-3 gradient-text mb-6">Buy {sweet.name}</h2>

                            <div className="mb-6 space-y-4">
                                {/* Price and Available */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-bold text-gray-800 heading-4">{sweet.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                    <span className="text-gray-600">Available:</span>
                                    <span className="font-bold text-gray-800 heading-4">{sweet.quantity}</span>
                                </div>

                                {/* Quantity Input */}
                                <div>
                                    <label className="block text-small font-semibold text-gray-700 mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={sweet.quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron-400 focus:border-transparent outline-none transition-all text-lg"
                                    />
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                    <span className="text-gray-800 font-semibold">Total:</span>
                                    <span className="heading-3 gradient-text">₹{(sweet.price * quantity).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowPurchaseModal(false)}
                                    className="flex-1 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 py-3 rounded-lg font-semibold transition-colors"
                                    disabled={purchaseMutation.isPending}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePurchase}
                                    className="flex-1 bg-gradient-to-r from-saffron-500 to-royal-500 hover:from-saffron-600 hover:to-royal-600 text-white py-3 rounded-lg font-semibold transition-all"
                                    disabled={purchaseMutation.isPending}
                                >
                                    {purchaseMutation.isPending ? 'Processing...' : '✓ Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Confirmation Modal */}
            {showSuccessModal && purchaseDetails && (
                <div className="modal-overlay backdrop-blur-md" onClick={handleContinueShopping}>
                    <div className="relative max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        {/* Modal content */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            {/* Success Icon */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                                    <FaCheckCircle className="text-white text-5xl" />
                                </div>
                                <h2 className="heading-3 gradient-text mb-2">Purchased Successful!</h2>
                                <p className="text-gray-600 text-body">Your order has been purchased successfully</p>
                            </div>

                            {/* Order Details */}
                            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-5 mb-6 border border-orange-200">
                                <h3 className="text-body font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    Purchase Details
                                </h3>

                                <div className="space-y-2.5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Item:</span>
                                        <span className="font-bold text-gray-800">{purchaseDetails.name}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Quantity:</span>
                                        <span className="font-bold text-gray-800">{purchaseDetails.quantity}</span>
                                    </div>

                                    <div className="flex justify-between items-center pb-3 border-b border-orange-200">
                                        <span className="text-gray-600">Unit Price:</span>
                                        <span className="font-bold text-gray-800">₹{purchaseDetails.price.toFixed(2)}</span>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base font-bold text-gray-800">Total Amount:</span>
                                            <span className="heading-3 text-red-600">₹{purchaseDetails.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-gradient-to-r from-saffron-500 to-royal-500 hover:from-saffron-600 hover:to-royal-600 text-white py-3.5 rounded-lg font-semibold text-base transition-all"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SweetCard;
