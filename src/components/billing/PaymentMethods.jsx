import React, { useState } from 'react';
import { BiCreditCard, BiPlus, BiEdit, BiTrash, BiCheck } from 'react-icons/bi';
import { useStripe } from '../../contexts/StripeContext';

const PaymentMethods = () => {
  const { customer, loading, error, openCustomerPortal } = useStripe();
  const [showAddCard, setShowAddCard] = useState(false);

  // Mock payment methods for demo
  const mockPaymentMethods = [
    {
      id: 'pm_1234567890',
      type: 'card',
      card: {
        brand: 'visa',
        last4: '4242',
        exp_month: 12,
        exp_year: 2024
      },
      is_default: true
    },
    {
      id: 'pm_0987654321',
      type: 'card',
      card: {
        brand: 'mastercard',
        last4: '8888',
        exp_month: 9,
        exp_year: 2025
      },
      is_default: false
    }
  ];

  const paymentMethods = customer?.payment_methods || mockPaymentMethods;

  const getCardIcon = (brand) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      default: '💳'
    };
    return icons[brand] || icons.default;
  };

  const handleManagePaymentMethods = async () => {
    try {
      await openCustomerPortal();
    } catch (err) {
      console.error('Failed to open customer portal:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-medium text-gray-900">Payment Methods</h4>
        <button
          onClick={handleManagePaymentMethods}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <BiEdit className="h-4 w-4 mr-2" />
          Manage
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">Error loading payment methods: {error}</p>
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <BiCreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">
                    {method.card.brand.charAt(0).toUpperCase() + method.card.brand.slice(1)} ending in {method.card.last4}
                  </p>
                  {method.is_default && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                      <BiCheck className="h-3 w-3 mr-1" />
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Expires {method.card.exp_month.toString().padStart(2, '0')}/{method.card.exp_year}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleManagePaymentMethods}
                className="text-gray-600 hover:text-gray-900 p-1"
                title="Edit payment method"
              >
                <BiEdit className="h-4 w-4" />
              </button>
              {!method.is_default && (
                <button
                  onClick={handleManagePaymentMethods}
                  className="text-red-600 hover:text-red-900 p-1"
                  title="Remove payment method"
                >
                  <BiTrash className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleManagePaymentMethods}
        className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
      >
        <BiPlus className="h-4 w-4 mr-1" />
        Add Payment Method
      </button>
    </div>
  );
};

export default PaymentMethods;