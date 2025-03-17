import React from 'react';
import AnalyticsStats from '../components/analytics/AnalyticsStats';
import RevenueChart from '../components/analytics/RevenueChart';
import InstructorPerformance from '../components/analytics/InstructorPerformance';
import ClassAttendance from '../components/analytics/ClassAttendance';
import InstructorROI from '../components/analytics/InstructorROI';
import ResourceOptimizer from '../components/instructors/ResourceOptimizer';
import InstructorPredictor from '../components/analytics/InstructorPredictor';
import ClassProfitability from '../components/analytics/ClassProfitability';

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <p className="mt-2 text-sm text-gray-700">
          Comprehensive insights into your gym's performance and metrics
        </p>
      </div>

      <AnalyticsStats />
      
      <div className="grid grid-cols-1 gap-8">
        <InstructorROI />
        <InstructorPredictor />
        <ClassProfitability />
        <ResourceOptimizer />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <InstructorPerformance />
      </div>

      <ClassAttendance />
    </div>
  );
};

export default Analytics;