import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { BiDollar, BiGroup, BiTime, BiTrendingUp } from 'react-icons/bi';

const ClassProfitability = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const classTypes = [
    { id: 'hiit', name: 'HIIT', profit: 2800, attendance: 89, trend: '+12%' },
    { id: 'yoga', name: 'Yoga', profit: 3200, attendance: 92, trend: '+15%' },
    { id: 'spinning', name: 'Spinning', profit: 2400, attendance: 85, trend: '+8%' },
    { id: 'strength', name: 'Strength', profit: 2900, attendance: 88, trend: '+10%' }
  ];

  const profitMetrics = {
    revenuePerClass: 450,
    profitMargin: 68,
    averageAttendance: 15,
    projectedGrowth: 12
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Revenue', 'Costs', 'Profit Margin']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Amount ($)',
        axisLabel: {
          formatter: '${value}'
        }
      },
      {
        type: 'value',
        name: 'Margin (%)',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: [600, 750, 500, 800, 700, 900, 600],
        itemStyle: {
          color: '#0ea5e9'
        }
      },
      {
        name: 'Costs',
        type: 'bar',
        data: [200, 250, 180, 270, 240, 300, 200],
        itemStyle: {
          color: '#64748b'
        }
      },
      {
        name: 'Profit Margin',
        type: 'line',
        yAxisIndex: 1,
        data: [66, 67, 64, 66, 65, 67, 66],
        itemStyle: {
          color: '#22c55e'
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Class Profitability Analysis</h3>
        <div className="flex space-x-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="all">All Classes</option>
            {classTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <BiDollar className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm text-gray-500">Revenue Per Class</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">${profitMetrics.revenuePerClass}</span>
            <span className="text-green-600 text-sm ml-2">+8%</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <BiTrendingUp className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm text-gray-500">Profit Margin</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{profitMetrics.profitMargin}%</span>
            <span className="text-green-600 text-sm ml-2">+5%</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <BiGroup className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm text-gray-500">Avg Attendance</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{profitMetrics.averageAttendance}</span>
            <span className="text-green-600 text-sm ml-2">+12%</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <BiTime className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm text-gray-500">Projected Growth</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{profitMetrics.projectedGrowth}%</span>
            <span className="text-green-600 text-sm ml-2">↑</span>
          </div>
        </div>
      </div>

      <ReactECharts option={option} style={{ height: '400px' }} />

      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-900 mb-4">Class Performance Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classTypes.map((type) => (
            <div key={type.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{type.name}</h5>
                  <div className="mt-1 flex items-center">
                    <span className="text-sm text-gray-500">Attendance: {type.attendance}%</span>
                    <span className="text-green-600 text-sm ml-4">{type.trend}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium text-gray-900">${type.profit}</div>
                  <div className="text-sm text-gray-500">Monthly Profit</div>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${type.attendance}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassProfitability;