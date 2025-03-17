import React from 'react';
import { BiMenu, BiBell, BiUserCircle } from 'react-icons/bi';
import GymSwitcher from '../organization/GymSwitcher';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden text-gray-500 hover:text-gray-600">
            <BiMenu className="h-6 w-6" />
          </button>
          <GymSwitcher />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-600">
            <BiBell className="h-6 w-6" />
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-600">
            <BiUserCircle className="h-6 w-6" />
            <span className="ml-2 text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;