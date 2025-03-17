import React from 'react';
import { BiDownload, BiCheck, BiX } from 'react-icons/bi';

const PayrollList = () => {
  const payrollData = [
    {
      id: 1,
      period: 'March 1-15, 2024',
      status: 'Completed',
      amount: '$12,450',
      instructors: 18,
      processedDate: '2024-03-15'
    },
    {
      id: 2,
      period: 'February 16-28, 2024',
      status: 'Completed',
      amount: '$11,820',
      instructors: 17,
      processedDate: '2024-02-28'
    },
    {
      id: 3,
      period: 'February 1-15, 2024',
      status: 'Completed',
      amount: '$12,100',
      instructors: 18,
      processedDate: '2024-02-15'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Payroll History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Processed Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrollData.map((payroll) => (
              <tr key={payroll.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payroll.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {payroll.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payroll.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payroll.instructors}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payroll.processedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">
                    <BiDownload className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollList;