import React from 'react';
import { BiEnvelope, BiBell, BiMobile } from 'react-icons/bi';

const NotificationSettings = () => {
  const notificationTypes = [
    {
      title: 'Email Notifications',
      icon: BiEnvelope,
      options: [
        { id: 'payroll', label: 'Payroll Processing' },
        { id: 'instructor_updates', label: 'Instructor Updates' },
        { id: 'performance', label: 'Performance Reports' },
        { id: 'system', label: 'System Notifications' }
      ]
    },
    {
      title: 'Push Notifications',
      icon: BiBell,
      options: [
        { id: 'class_alerts', label: 'Class Alerts' },
        { id: 'attendance', label: 'Attendance Updates' },
        { id: 'payments', label: 'Payment Confirmations' }
      ]
    },
    {
      title: 'SMS Notifications',
      icon: BiMobile,
      options: [
        { id: 'urgent', label: 'Urgent Alerts' },
        { id: 'schedule', label: 'Schedule Changes' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to receive notifications and updates
        </p>
      </div>

      <div className="space-y-8">
        {notificationTypes.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center">
              <section.icon className="h-5 w-5 text-gray-400" />
              <h4 className="ml-2 text-base font-medium text-gray-900">
                {section.title}
              </h4>
            </div>

            <div className="ml-7 space-y-4">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label
                    htmlFor={option.id}
                    className="ml-3 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="button"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;