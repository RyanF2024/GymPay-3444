import React from 'react';
import { BiCamera } from 'react-icons/bi';

const GymProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Gym Profile</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your gym's information and business details
        </p>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
            <BiCamera className="h-8 w-8 text-gray-400" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg border border-gray-300">
            <BiCamera className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="ml-6">
          <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            Change Logo
          </button>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gym Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Description
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default GymProfile;