import React, { useState } from 'react';
import GymProfile from '../components/settings/GymProfile';
import NotificationSettings from '../components/settings/NotificationSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import UserAccess from '../components/settings/UserAccess';
import BillingSettings from '../components/settings/BillingSettings';
import OrganizationSettings from '../components/organization/OrganizationSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('organization');

  const tabs = [
    { id: 'organization', label: 'Organization' },
    { id: 'profile', label: 'Gym Profile' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'access', label: 'User Access' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'organization':
        return <OrganizationSettings />;
      case 'profile':
        return <GymProfile />;
      case 'billing':
        return <BillingSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'access':
        return <UserAccess />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="mt-2 text-sm text-gray-700">
          Manage your organization and gym settings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;