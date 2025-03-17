import React from 'react';
import { BiEdit, BiTrash, BiMessageSquare } from 'react-icons/bi';

const InstructorList = () => {
  const instructors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialties: ['Yoga', 'Pilates'],
      classes: 12,
      rating: 4.8,
      status: 'Active',
      earnings: '$2,840'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialties: ['HIIT', 'Strength'],
      classes: 15,
      rating: 4.9,
      status: 'Active',
      earnings: '$3,120'
    },
    {
      id: 3,
      name: 'Emma Davis',
      specialties: ['Zumba', 'Dance'],
      classes: 10,
      rating: 4.7,
      status: 'Active',
      earnings: '$2,560'
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Instructor Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes/Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Earnings
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {instructor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {instructor.classes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{instructor.rating}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {instructor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {instructor.earnings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-primary-600 hover:text-primary-900">
                      <BiEdit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <BiMessageSquare className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <BiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorList;