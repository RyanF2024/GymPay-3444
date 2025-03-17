import React from 'react';
import { BiCopy, BiEnvelope, BiLink } from 'react-icons/bi';

const ReferralList = () => {
  const referrals = [
    {
      id: 1,
      referrer: 'Sarah Johnson',
      referred: 'Mike Wilson',
      status: 'Converted',
      reward: '$50',
      date: '2024-03-15'
    },
    {
      id: 2,
      referrer: 'John Smith',
      referred: 'Emma Davis',
      status: 'Pending',
      reward: '--',
      date: '2024-03-14'
    },
    {
      id: 3,
      referrer: 'Lisa Brown',
      referred: 'Tom Harris',
      status: 'Converted',
      reward: '$50',
      date: '2024-03-12'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Referrals</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referrer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referred
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reward
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {referrals.map((referral) => (
              <tr key={referral.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {referral.referrer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {referral.referred}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    referral.status === 'Converted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {referral.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {referral.reward}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {referral.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-primary-600 hover:text-primary-900">
                      <BiLink className="h-5 w-5" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <BiEnvelope className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralList;