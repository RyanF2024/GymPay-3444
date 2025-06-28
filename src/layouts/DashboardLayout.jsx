import React from 'react';
import { Outlet } from 'react-router-dom';
import AnimatedSidebar from '../components/navigation/AnimatedSidebar';
import Header from '../components/navigation/Header';
import { BiHome, BiMoney, BiGroup, BiChart, BiCog, BiGift } from 'react-icons/bi';
import { createNavItem } from '../components/navigation/types';

const DashboardLayout = () => {
  const navItems = [
    createNavItem(BiHome, 'Dashboard', '/'),
    createNavItem(BiMoney, 'Payroll', '/payroll'),
    createNavItem(BiGroup, 'Instructors', '/instructors', '3'), // Badge example
    createNavItem(BiChart, 'Analytics', '/analytics'),
    createNavItem(BiGift, 'Referrals', '/referrals'),
    createNavItem(BiCog, 'Settings', '/settings')
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AnimatedSidebar 
        navItems={navItems}
        defaultExpanded={false}
        showPinToggle={true}
        variant="default"
      />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-16">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;