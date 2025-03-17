import React, { useState } from 'react';
import ReferralStats from '../components/referrals/ReferralStats';
import ReferralList from '../components/referrals/ReferralList';
import ReferralForm from '../components/referrals/ReferralForm';
import ReferralRewards from '../components/referrals/ReferralRewards';

const Referrals = () => {
  const [showReferralForm, setShowReferralForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Referral Program</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage your gym's referral program and track referral performance
          </p>
        </div>
        <button
          onClick={() => setShowReferralForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          Create Referral Link
        </button>
      </div>

      <ReferralStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ReferralList />
        </div>
        <div>
          <ReferralRewards />
        </div>
      </div>

      {showReferralForm && (
        <ReferralForm onClose={() => setShowReferralForm(false)} />
      )}
    </div>
  );
};

export default Referrals;