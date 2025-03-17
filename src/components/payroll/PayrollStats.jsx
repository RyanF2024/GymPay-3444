import React from 'react';
import { BiCalendar, BiDollar, BiTime, BiTransfer } from 'react-icons/bi';

const PayrollStats = () => {
  const stats = [
    {
      icon: BiDollar,
      title: 'Next Payroll Amount',
      value: '$24,780',
      info: 'Due in 5 days'
    },
    {
      icon: BiTime,
      title: 'Total Hours',
      value: '842',
      info: 'This period'
    },
    {
      icon: BiTransfer,
      title: 'Pending Transfers',
      value: '12',
      info: 'To be processed'
    },
    {
      icon: BiCalendar,
      title: 'Next Pay Date',
      value: 'Mar 15',
      info: 'Friday'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.info}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayrollStats;