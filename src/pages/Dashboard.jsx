import React from 'react';
import OverviewStats from '../components/dashboard/OverviewStats';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="mt-2 text-sm text-gray-700">
          Welcome back! Here's an overview of your gym's performance.
        </p>
      </div>
      
      <OverviewStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder for future charts/components */}
        <div className="bg-white p-6 rounded-lg shadow min-h-[400px]">
          <h3 className="text-lg font-medium text-gray-900">Revenue Trends</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow min-h-[400px]">
          <h3 className="text-lg font-medium text-gray-900">Top Instructors</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;