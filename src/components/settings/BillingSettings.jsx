import React from 'react';
import { BiCreditCard, BiHistory } from 'react-icons/bi';
import SubscriptionStatus from '../subscription/SubscriptionStatus';

const BillingSettings = () => {
  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      default: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/25',
      default: false
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Billing & Subscription</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and payment methods
        </p>
      </div>

      <SubscriptionStatus />

      <div className="bg-white shadow rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h4>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <BiCreditCard className="h-6 w-6 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {method.type} ending in {method.last4}
                  </p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
                {method.default && (
                  <span className="ml-4 px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
            </div>
          ))}
        </div>
        <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium">
          + Add Payment Method
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">Billing History</h4>
          <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            <BiHistory className="h-5 w-5 mr-1" />
            View All
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Description</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 text-sm text-gray-900">Mar 15, 2024</td>
              <td className="py-4 text-sm text-gray-900">Monthly Subscription</td>
              <td className="py-4 text-sm text-gray-900">$393.00</td>
              <td className="py-4 text-right">
                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Paid
                </span>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-4 text-sm text-gray-900">Feb 15, 2024</td>
              <td className="py-4 text-sm text-gray-900">Monthly Subscription</td>
              <td className="py-4 text-sm text-gray-900">$393.00</td>
              <td className="py-4 text-right">
                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingSettings;