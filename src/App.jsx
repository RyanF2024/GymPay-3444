import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StripeProvider } from './contexts/StripeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Payroll from './pages/Payroll';
import Instructors from './pages/Instructors';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Referrals from './pages/Referrals';
import Pricing from './pages/Pricing';
import SubscriptionSuccess from './pages/SubscriptionSuccess';

function App() {
  return (
    <StripeProvider>
      <Router>
        <Routes>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subscription/success" element={<SubscriptionSuccess />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </StripeProvider>
  );
}

export default App;