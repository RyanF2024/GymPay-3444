import React from 'react';
import ReactECharts from 'echarts-for-react';
import { BiDollar, BiTrendingUp } from 'react-icons/bi';

const InstructorROI = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        const revenue = params[0].value;
        const cost = params[1].value;
        const roi = ((revenue - cost) / cost * 100).toFixed(1);
        return `
          Revenue: $${revenue}<br/>
          Cost: $${cost}<br/>
          ROI: ${roi}%
        `;
      }
    },
    legend: {
      data: ['Revenue Generated', 'Instructor Cost']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Sarah J.', 'Michael C.', 'Emma D.', 'John S.', 'Lisa R.']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}k'
      }
    },
    series: [
      {
        name: 'Revenue Generated',
        type: 'bar',
        data: [48, 42, 35, 30, 25],
        itemStyle: {
          color: '#0ea5e9'
        }
      },
      {
        name: 'Instructor Cost',
        type: 'bar',
        data: [20, 18, 15, 14, 12],
        itemStyle: {
          color: '#64748b'
        }
      }
    ]
  };

  const topPerformers = [
    {
      name: 'Sarah Johnson',
      revenue: '$48,000',
      cost: '$20,000',
      roi: '140%',
      retention: '95%',
      locations: ['Downtown Fitness', 'Westside Gym']
    },
    {
      name: 'Michael Chen',
      revenue: '$42,000',
      cost: '$18,000',
      roi: '133%',
      retention: '92%',
      locations: ['Elite Training Center', 'Downtown Fitness']
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Instructor ROI Analysis</h3>
        <select className="rounded-md border-gray-300 text-sm">
          <option>Last 30 Days</option>
          <option>Last Quarter</option>
          <option>Last Year</option>
        </select>
      </div>

      <ReactECharts option={option} style={{ height: '400px' }} />

      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-900 mb-4">Top Performing Instructors</h4>
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{performer.name}</h5>
                  <div className="text-sm text-gray-500 mt-1">
                    Works at: {performer.locations.join(', ')}
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {performer.roi} ROI
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-500">Revenue</div>
                  <div className="text-md font-medium text-gray-900">{performer.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Cost</div>
                  <div className="text-md font-medium text-gray-900">{performer.cost}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Retention</div>
                  <div className="text-md font-medium text-gray-900">{performer.retention}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorROI;