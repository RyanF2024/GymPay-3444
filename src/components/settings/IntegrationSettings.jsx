import React from 'react';
import { BiLink, BiCheckCircle } from 'react-icons/bi';

const IntegrationSettings = () => {
  const integrations = [
    {
      name: 'Stripe',
      description: 'Payment processing integration',
      status: 'connected',
      icon: '💳'
    },
    {
      name: 'QuickBooks',
      description: 'Accounting software integration',
      status: 'disconnected',
      icon: '📊'
    },
    {
      name: 'Mindbody',
      description: 'Gym management platform',
      status: 'connected',
      icon: '🏋️'
    },
    {
      name: 'Mailchimp',
      description: 'Email marketing integration',
      status: 'disconnected',
      icon: '📧'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Integrations</h3>
        <p className="mt-1 text-sm text-gray-500">
          Connect your favorite tools and services
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{integration.icon}</div>
              <div>
                <h4 className="text-base font-medium text-gray-900">
                  {integration.name}
                </h4>
                <p className="text-sm text-gray-500">{integration.description}</p>
              </div>
            </div>

            <div>
              {integration.status === 'connected' ? (
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-green-700 bg-green-100">
                  <BiCheckCircle className="mr-1.5 h-4 w-4" />
                  Connected
                </button>
              ) : (
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <BiLink className="mr-1.5 h-4 w-4" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationSettings;