import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiHome, BiMoney, BiGroup, BiChart, BiCog, BiGift } from 'react-icons/bi';

const Sidebar = () => {
  const navItems = [
    { icon: BiHome, label: 'Dashboard', path: '/' },
    { icon: BiMoney, label: 'Payroll', path: '/payroll' },
    { icon: BiGroup, label: 'Instructors', path: '/instructors' },
    { icon: BiChart, label: 'Analytics', path: '/analytics' },
    { icon: BiGift, label: 'Referrals', path: '/referrals' },
    { icon: BiCog, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-secondary-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold text-white">GymPay</h1>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-secondary-900 text-white'
                        : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;