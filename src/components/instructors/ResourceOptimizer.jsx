import React, { useState } from 'react';
import { BiTransfer, BiTime, BiDollar, BiTrendingUp } from 'react-icons/bi';

const ResourceOptimizer = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');

  const scheduleGaps = [
    {
      location: 'Downtown Fitness',
      time: '10:00 AM - 11:00 AM',
      potential: '$120',
      suggestion: 'Move Sarah\'s HIIT class from Westside Gym',
      impact: '+15% utilization'
    },
    {
      location: 'Westside Gym',
      time: '2:00 PM - 4:00 PM',
      potential: '$250',
      suggestion: 'Schedule Michael\'s popular yoga sessions',
      impact: '+22% utilization'
    }
  ];

  const instructorSuggestions = [
    {
      instructor: 'Emma Davis',
      currentLoad: '75%',
      suggestion: 'Can take 3 more classes at Downtown Fitness',
      potential: '$450/week',
      expertise: ['HIIT', 'Strength Training']
    },
    {
      instructor: 'John Smith',
      currentLoad: '60%',
      suggestion: 'Underutilized at Elite Training Center',
      potential: '$600/week',
      expertise: ['Yoga', 'Pilates']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Resource Optimization</h3>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="all">All Locations</option>
            <option value="downtown">Downtown Fitness</option>
            <option value="westside">Westside Gym</option>
            <option value="elite">Elite Training Center</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <BiTime className="mr-2 text-primary-600" />
              Schedule Optimization
            </h4>
            <div className="space-y-4">
              {scheduleGaps.map((gap, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{gap.location}</h5>
                      <div className="text-sm text-gray-500 mt-1">{gap.time}</div>
                    </div>
                    <span className="text-primary-600 font-medium">{gap.potential}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{gap.suggestion}</div>
                  <div className="mt-2 text-sm text-green-600">{gap.impact}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <BiTransfer className="mr-2 text-primary-600" />
              Instructor Allocation
            </h4>
            <div className="space-y-4">
              {instructorSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{suggestion.instructor}</h5>
                      <div className="text-sm text-gray-500 mt-1">
                        Current Load: {suggestion.currentLoad}
                      </div>
                    </div>
                    <span className="text-primary-600 font-medium">{suggestion.potential}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">{suggestion.suggestion}</div>
                    <div className="flex gap-2 mt-2">
                      {suggestion.expertise.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <BiDollar className="mr-2 text-primary-600" />
            Revenue Optimization Opportunities
          </h4>
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-primary-700 font-medium">Total Potential Additional Revenue</div>
                <div className="text-sm text-gray-600 mt-1">By implementing suggested optimizations</div>
              </div>
              <div className="text-2xl font-bold text-primary-700">$3,840/month</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm text-gray-500">Schedule Optimization</div>
                <div className="text-lg font-medium text-gray-900">$1,480</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm text-gray-500">Instructor Allocation</div>
                <div className="text-lg font-medium text-gray-900">$1,860</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm text-gray-500">Cross-Location Synergy</div>
                <div className="text-lg font-medium text-gray-900">$500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceOptimizer;