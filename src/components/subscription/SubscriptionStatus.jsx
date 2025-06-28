import React from 'react';
import { BiCrown, BiCalendar, BiDollar, BiEdit, BiLinkExternal } from 'react-icons/bi';
import { useStripe } from '../../contexts/StripeContext';

const SubscriptionStatus = () => {
  const { subscription, customer, loading, error, openCustomerPortal, stripeService } = useStripe();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600">
          <p>Error loading subscription data: {error}</p>
        </div>
      </div>
    );
  }

  // Mock data if no real subscription (for demo purposes)
  const mockSubscription = {
    status: 'active',
    current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
    items: {
      data: [{
        price: {
          unit_amount: 24900, // $249.00
          currency: 'usd',
          nickname: 'Professional Plan'
        }
      }]
    }
  };

  const displaySubscription = subscription || mockSubscription;
  const plan = displaySubscription.items?.data[0]?.price;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
    } catch (err) {
      console.error('Failed to open customer portal:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Subscription Details
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(displaySubscription.status)}`}>
          {displaySubscription.status?.charAt(0).toUpperCase() + displaySubscription.status?.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <BiCrown className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">Current Plan:</span>
            <span className="ml-2 font-medium text-gray-900">
              {plan?.nickname || 'Professional'}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <BiCalendar className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">Next Billing Date:</span>
            <span className="ml-2 font-medium text-gray-900">
              {stripeService.formatDate(displaySubscription.current_period_end)}
            </span>
          </div>

          <div className="flex items-center">
            <BiDollar className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">Monthly Fee:</span>
            <span className="ml-2 font-medium text-gray-900">
              {stripeService.formatCurrency(plan?.unit_amount || 24900, plan?.currency)}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Billing Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium">
                {stripeService.formatCurrency(plan?.unit_amount || 24900, plan?.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Instructors (18 × $8)</span>
              <span className="font-medium">$144</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  {stripeService.formatCurrency((plan?.unit_amount || 24900) + 14400, plan?.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button 
          onClick={handleManageSubscription}
          className="text-gray-600 hover:text-gray-900 font-medium flex items-center"
        >
          <BiLinkExternal className="h-4 w-4 mr-1" />
          View Invoice History
        </button>
        <button 
          onClick={handleManageSubscription}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center"
        >
          <BiEdit className="h-4 w-4 mr-2" />
          Manage Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionStatus;