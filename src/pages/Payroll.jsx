import React, { useState } from 'react';
import { BiCalendar, BiDollar, BiTime, BiTransfer } from 'react-icons/bi';
import PayrollList from '../components/payroll/PayrollList';
import PayrollForm from '../components/payroll/PayrollForm';
import PayrollStats from '../components/payroll/PayrollStats';

const Payroll = () => {
  const [showPayrollForm, setShowPayrollForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Payroll Management</h2>
          <p className="mt-2 text-sm text-gray-700">
            Process and manage instructor payments
          </p>
        </div>
        <button
          onClick={() => setShowPayrollForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          Process New Payroll
        </button>
      </div>

      <PayrollStats />
      <PayrollList />
      {showPayrollForm && (
        <PayrollForm onClose={() => setShowPayrollForm(false)} />
      )}
    </div>
  );
};

export default Payroll;