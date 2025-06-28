import React, { useState, useEffect } from 'react';
import { BiEdit, BiTrash, BiMessageSquare, BiPlus } from 'react-icons/bi';
import { db } from '../../lib/supabase';

const InstructorList = ({ onAddInstructor }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll use a mock organization ID
      const organizationId = '550e8400-e29b-41d4-a716-446655440000';
      const data = await db.getInstructors(organizationId);
      setInstructors(data);
    } catch (err) {
      console.error('Error loading instructors:', err);
      setError('Failed to load instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInstructor = async (instructorId) => {
    if (!confirm('Are you sure you want to delete this instructor?')) {
      return;
    }

    try {
      await db.deleteInstructor(instructorId);
      setInstructors(instructors.filter(instructor => instructor.id !== instructorId));
    } catch (err) {
      console.error('Error deleting instructor:', err);
      alert('Failed to delete instructor');
    }
  };

  const formatName = (instructor) => {
    return `${instructor.first_name} ${instructor.last_name}`;
  };

  const formatSpecialties = (specialties) => {
    if (!specialties || specialties.length === 0) return [];
    return Array.isArray(specialties) ? specialties : [specialties];
  };

  const calculateMonthlyEarnings = (hourlyRate) => {
    // Estimate based on 15 hours per week * 4 weeks
    const estimatedHours = 15 * 4;
    return (hourlyRate * estimatedHours).toFixed(0);
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadInstructors}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Instructor Directory</h3>
        {!db.isSupabaseConnected() && (
          <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
            Demo Mode
          </span>
        )}
      </div>
      
      {instructors.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <BiPlus className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No instructors</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first instructor.
          </p>
          <div className="mt-6">
            <button
              onClick={onAddInstructor}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <BiPlus className="mr-2 h-4 w-4" />
              Add Instructor
            </button>
          </div>
        </div>
      ) : (
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
                  Hourly Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Monthly
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {instructors.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {instructor.first_name?.[0]}{instructor.last_name?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatName(instructor)}
                        </div>
                        <div className="text-sm text-gray-500">{instructor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 flex-wrap">
                      {formatSpecialties(instructor.specialties).map((specialty, index) => (
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
                    ${instructor.hourly_rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      instructor.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {instructor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${calculateMonthlyEarnings(instructor.hourly_rate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instructor.gym?.name || 'Not assigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-primary-600 hover:text-primary-900 p-1"
                        title="Edit instructor"
                      >
                        <BiEdit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900 p-1"
                        title="Send message"
                      >
                        <BiMessageSquare className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteInstructor(instructor.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete instructor"
                      >
                        <BiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstructorList;