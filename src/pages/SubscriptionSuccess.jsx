import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiCheck, BiArrowRight } from 'react-icons/bi';
import { useStripe } from '../contexts/StripeContext';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshData } = useStripe();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh subscription data after successful payment
    if (sessionId) {
      refreshData();
    }
  }, [sessionId, refreshData]);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <BiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to GymPay!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your subscription has been successfully activated
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What's next?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <BiCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Set up your gym profile and preferences
              </span>
            </li>
            <li className="flex items-start">
              <BiCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Add your instructors and configure payroll
              </span>
            </li>
            <li className="flex items-start">
              <BiCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Explore analytics and reporting features
              </span>
            </li>
            <li className="flex items-start">
              <BiCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">
                Set up integrations with your existing tools
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleContinue}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Get Started
            <BiArrowRight className="ml-2 h-4 w-4" />
          </button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Need help getting started?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;