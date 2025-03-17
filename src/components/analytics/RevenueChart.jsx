import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format } from 'date-fns';

const RevenueChart = () => {
  const currentDate = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - (5 - i));
    return format(date, 'MMM yyyy');
  });

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
      type: 'category',
      data: last6Months,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}k'
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        barWidth: '60%',
        data: [48, 52, 45, 65, 58, 75],
        itemStyle: {
          color: '#0ea5e9'
        }
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default RevenueChart;