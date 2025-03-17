import React, { useState } from 'react';
import { BiChevronDown, BiPlus, BiBuilding } from 'react-icons/bi';

const GymSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewGymForm, setShowNewGymForm] = useState(false);

  const gyms = [
    { id: 1, name: 'Downtown Fitness', location: 'New York' },
    { id: 2, name: 'Westside Gym', location: 'Los Angeles' },
    { id: 3, name: 'Elite Training Center', location: 'Chicago' }
  ];

  const [selectedGym, setSelectedGym] = useState(gyms[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-white rounded-lg p-2 hover:bg-gray-50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <BiBuilding className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">{selectedGym.name}</div>
            <div className="text-xs text-gray-500">{selectedGym.location}</div>
          </div>
        </div>
        <BiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-72 mt-2 bg-white rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-2 py-1">Your Gyms</div>
            {gyms.map((gym) => (
              <button
                key={gym.id}
                onClick={() => {
                  setSelectedGym(gym);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2 py-2 rounded-md ${
                  selectedGym.id === gym.id ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <BiBuilding className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{gym.name}</div>
                    <div className="text-xs text-gray-500">{gym.location}</div>
                  </div>
                </div>
              </button>
            ))}
            <div className="border-t my-2"></div>
            <button
              onClick={() => {
                setShowNewGymForm(true);
                setIsOpen(false);
              }}
              className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-50 text-primary-600 flex items-center"
            >
              <BiPlus className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Add New Gym</span>
            </button>
          </div>
        </div>
      )}

      {showNewGymForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Gym</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gym Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewGymForm(false)}
                  className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Add Gym
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymSwitcher;