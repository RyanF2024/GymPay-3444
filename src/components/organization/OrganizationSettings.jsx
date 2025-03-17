import React from 'react';
import { BiBuilding, BiUser, BiCreditCard } from 'react-icons/bi';

const OrganizationSettings = () => {
  const organization = {
    name: 'Fitness Group International',
    plan: 'Enterprise',
    gyms: 3,
    maxGyms: 10,
    owner: 'John Smith',
    email: 'john@fitnessgroup.com'
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Organization Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your organization's profile and settings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <BiBuilding className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">{organization.name}</h4>
              <p className="text-sm text-gray-500">
                {organization.gyms} of {organization.maxGyms} gyms used
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Organization Owner</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <BiUser className="mr-2 h-5 w-5 text-gray-400" />
                  {organization.owner}
                </dd>
              </div>

              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {organization.email}
                </dd>
              </div>

              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Subscription Plan</dt>
                <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <BiCreditCard className="mr-2 h-5 w-5 text-gray-400" />
                  {organization.plan}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Organization Members</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Access Level
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      John Smith
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Owner
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Full Access
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Sarah Johnson
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Admin
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Admin Access
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              Invite Member
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSettings;