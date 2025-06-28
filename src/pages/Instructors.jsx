import React, { useState } from 'react';
import InstructorList from '../components/instructors/InstructorList';
import InstructorStats from '../components/instructors/InstructorStats';
import InstructorForm from '../components/instructors/InstructorForm';

const Instructors = () => {
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddInstructor = () => {
    setShowInstructorForm(true);
  };

  const handleInstructorAdded = () => {
    // Refresh the instructor list
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Instructor Management</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage your fitness instructors and their performance
          </p>
        </div>
        <button
          onClick={handleAddInstructor}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          Add New Instructor
        </button>
      </div>

      <InstructorStats />
      <InstructorList 
        key={refreshKey}
        onAddInstructor={handleAddInstructor}
      />
      
      {showInstructorForm && (
        <InstructorForm 
          onClose={() => setShowInstructorForm(false)}
          onSuccess={handleInstructorAdded}
        />
      )}
    </div>
  );
};

export default Instructors;