import React from 'react';
import { BiX, BiLink } from 'react-icons/bi';

const ReferralForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Create Referral Link</h3>
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
                Referral Program
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>New Member Referral ($50 Reward)</option>
                <option>Instructor Referral ($100 Reward)</option>
                <option>Partner Gym Referral ($200 Reward)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Referrer Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Referral Link
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  https://
                </span>
                <input
                  type="text"
                  className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  value="gympay.com/ref/sarah-j"
                  readOnly
                />
                <button
                  type="button"
                  className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <BiLink className="h-5 w-5 mr-2" />
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Generate Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;