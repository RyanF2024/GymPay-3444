import React from 'react';
import ReactECharts from 'echarts-for-react';
import { BiTrendingUp, BiUserVoice, BiDollar } from 'react-icons/bi';

const InstructorPredictor = () => {
  const predictiveMetrics = {
    revenue: {
      current: 48000,
      predicted: 62000,
      confidence: 89
    },
    retention: {
      current: 85,
      predicted: 92,
      confidence: 94
    },
    satisfaction: {
      current: 4.2,
      predicted: 4.7,
      confidence: 91
    }
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Current', 'Predicted']
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
        formatter: '${value}k'
      }
    },
    yAxis: {
      type: 'category',
      data: ['Revenue', 'Member Retention', 'Client Satisfaction']
    },
    series: [
      {
        name: 'Current',
        type: 'bar',
        data: [48, 85, 4.2],
        itemStyle: {
          color: '#0ea5e9'
        }
      },
      {
        name: 'Predicted',
        type: 'bar',
        data: [62, 92, 4.7],
        itemStyle: {
          color: '#22c55e'
        }
      }
    ]
  };

  const recommendations = [
    {
      title: "Optimize Class Schedule",
      impact: "+15% Revenue",
      description: "Moving HIIT classes to peak hours could increase attendance",
      confidence: 92
    },
    {
      title: "Specialization Focus",
      impact: "+8% Client Retention",
      description: "Adding advanced yoga certification could attract premium clients",
      confidence: 88
    },
    {
      title: "Cross-Training Program",
      impact: "+12% Member Engagement",
      description: "Introducing hybrid strength/cardio sessions",
      confidence: 85
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Instructor Performance Predictor</h3>
        <select className="rounded-md border-gray-300 text-sm">
          <option>Next 3 Months</option>
          <option>Next 6 Months</option>
          <option>Next Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(predictiveMetrics).map(([key, metric]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-500 capitalize">{key}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                metric.confidence >= 90 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {metric.confidence}% confidence
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {typeof metric.predicted === 'number' && metric.predicted >= 1000 
                    ? `$${metric.predicted.toLocaleString()}`
                    : metric.predicted}
                </span>
                <span className="text-sm text-gray-500 ml-2">predicted</span>
              </div>
              <div className="flex items-center text-green-600">
                <BiTrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">
                  +{(((metric.predicted - metric.current) / metric.current) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactECharts option={option} style={{ height: '300px' }} />

      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-900 mb-4">Growth Recommendations</h4>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{rec.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-medium">{rec.impact}</span>
                  <span className="text-xs text-gray-500">{rec.confidence}% confidence</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorPredictor;