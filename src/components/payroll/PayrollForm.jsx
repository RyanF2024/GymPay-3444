import React from 'react';
import { BiX } from 'react-icons/bi';

const PayrollForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Process New Payroll</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <BiX className="h-6 w-6" />
          </button>
        </div>

        <form className="mt-4">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay Period
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                <option>Direct Deposit</option>
                <option>PayPal</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                rows={4}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Process Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollForm;