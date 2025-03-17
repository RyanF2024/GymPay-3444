import React from 'react';
import { BiUser, BiTime, BiTrophy, BiDollar } from 'react-icons/bi';

const InstructorStats = () => {
  const stats = [
    {
      icon: BiUser,
      title: 'Total Instructors',
      value: '24',
      info: '3 new this month'
    },
    {
      icon: BiTime,
      title: 'Average Classes/Week',
      value: '15',
      info: 'Per instructor'
    },
    {
      icon: BiTrophy,
      title: 'Top Performance',
      value: '96%',
      info: 'Satisfaction rate'
    },
    {
      icon: BiDollar,
      title: 'Average Earnings',
      value: '$2,450',
      info: 'Per month'
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

export default InstructorStats;