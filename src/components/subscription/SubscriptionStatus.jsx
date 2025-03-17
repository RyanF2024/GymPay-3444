import React from 'react';
import { BiCrown, BiCalendar, BiDollar } from 'react-icons/bi';

const SubscriptionStatus = () => {
  const subscription = {
    plan: 'Professional',
    status: 'Active',
    nextBilling: '2024-04-15',
    amount: 249,
    instructors: 18,
    instructorFee: 8,
    totalAmount: 393 // Base + (instructors * fee)
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Subscription Details
        </h3>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {subscription.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <BiCrown className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">Current Plan:</span>
            <span className="ml-2 font-medium text-gray-900">
              {subscription.plan}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <BiCalendar className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">Next Billing Date:</span>
            <span className="ml-2 font-medium text-gray-900">
              {subscription.nextBilling}
            </span>
          </div>

          <div className="flex items-center">
            <BiDollar className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">Total Monthly Fee:</span>
            <span className="ml-2 font-medium text-gray-900">
              ${subscription.totalAmount}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Fee Breakdown
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Plan</span>
              <span className="font-medium">${subscription.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Instructors ({subscription.instructors} × ${subscription.instructorFee})
              </span>
              <span className="font-medium">
                ${subscription.instructors * subscription.instructorFee}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${subscription.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="text-gray-600 hover:text-gray-900 font-medium">
          View Invoice History
        </button>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
          Manage Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionStatus;