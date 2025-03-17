import React from 'react';
import { BiUserPlus, BiDollar, BiTrendingUp, BiGroup } from 'react-icons/bi';

const ReferralStats = () => {
  const stats = [
    {
      icon: BiUserPlus,
      title: 'Total Referrals',
      value: '128',
      change: '+12.5%',
      period: 'vs last month'
    },
    {
      icon: BiDollar,
      title: 'Rewards Paid',
      value: '$2,450',
      change: '+8.2%',
      period: 'vs last month'
    },
    {
      icon: BiTrendingUp,
      title: 'Conversion Rate',
      value: '42%',
      change: '+5.4%',
      period: 'vs last month'
    },
    {
      icon: BiGroup,
      title: 'Active Referrers',
      value: '36',
      change: '+15.8%',
      period: 'vs last month'
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
              <div className="flex items-center">
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">{stat.period}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReferralStats;