import React from 'react';
import { BiGift, BiTrophy } from 'react-icons/bi';

const ReferralRewards = () => {
  const rewards = [
    {
      type: 'New Member',
      reward: '$50',
      criteria: 'Per successful sign-up',
      description: 'Reward for referring new gym members'
    },
    {
      type: 'Instructor',
      reward: '$100',
      criteria: 'Per hired instructor',
      description: 'Reward for referring qualified instructors'
    },
    {
      type: 'Partner Gym',
      reward: '$200',
      criteria: 'Per partnership',
      description: 'Reward for referring partner gyms'
    }
  ];

  const topReferrers = [
    { name: 'Sarah Johnson', count: 12, amount: '$600' },
    { name: 'Mike Wilson', count: 8, amount: '$400' },
    { name: 'Emma Davis', count: 6, amount: '$300' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <BiGift className="h-5 w-5 mr-2 text-primary-600" />
          Reward Structure
        </h3>
        <div className="space-y-4">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">{reward.type}</h4>
                <span className="text-lg font-semibold text-primary-600">
                  {reward.reward}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{reward.criteria}</p>
              <p className="text-xs text-gray-500 mt-1">{reward.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <BiTrophy className="h-5 w-5 mr-2 text-primary-600" />
          Top Referrers
        </h3>
        <div className="space-y-4">
          {topReferrers.map((referrer, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{referrer.name}</p>
                <p className="text-xs text-gray-500">{referrer.count} referrals</p>
              </div>
              <span className="text-sm font-semibold text-primary-600">
                {referrer.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralRewards;