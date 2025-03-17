import React from 'react';
import { BiDollar, BiGroup, BiTime, BiTrendingUp } from 'react-icons/bi';

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-primary-100 text-primary-600">
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </p>
        )}
      </div>
    </div>
  </div>
);

const OverviewStats = () => {
  const stats = [
    { icon: BiDollar, title: 'Total Payroll', value: '$45,231', change: 2.5 },
    { icon: BiGroup, title: 'Active Instructors', value: '23', change: 5.0 },
    { icon: BiTime, title: 'Hours Tracked', value: '1,203', change: -1.2 },
    { icon: BiTrendingUp, title: 'Revenue', value: '$98,432', change: 8.1 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default OverviewStats;