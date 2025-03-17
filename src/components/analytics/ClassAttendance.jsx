import React from 'react';
import ReactECharts from 'echarts-for-react';

const ClassAttendance = () => {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Yoga', 'HIIT', 'Pilates', 'Strength', 'Zumba'],
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      top: 50
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} attendees'
      }
    },
    series: [
      {
        name: 'Yoga',
        type: 'line',
        data: [15, 18, 12, 20, 16, 22, 14],
        smooth: true
      },
      {
        name: 'HIIT',
        type: 'line',
        data: [12, 14, 16, 10, 15, 18, 12],
        smooth: true
      },
      {
        name: 'Pilates',
        type: 'line',
        data: [8, 12, 10, 14, 12, 16, 10],
        smooth: true
      },
      {
        name: 'Strength',
        type: 'line',
        data: [10, 15, 12, 18, 14, 20, 15],
        smooth: true
      },
      {
        name: 'Zumba',
        type: 'line',
        data: [14, 16, 18, 12, 16, 14, 18],
        smooth: true
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Class Attendance</h3>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default ClassAttendance;