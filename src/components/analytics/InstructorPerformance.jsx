import React from 'react';
import ReactECharts from 'echarts-for-react';

const InstructorPerformance = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: ['Sarah J.', 'Michael C.', 'Emma D.', 'John S.', 'Lisa R.'],
      axisTick: {
        alignWithLabel: true
      }
    },
    series: [
      {
        name: 'Performance Score',
        type: 'bar',
        data: [96, 92, 89, 87, 85],
        itemStyle: {
          color: '#0ea5e9'
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%'
        }
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Instructor Performance</h3>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default InstructorPerformance;