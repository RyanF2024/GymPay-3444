import React from 'react';
import SubscriptionStatus from '../subscription/SubscriptionStatus';
import PaymentMethods from '../billing/PaymentMethods';
import InvoiceHistory from '../billing/InvoiceHistory';

const BillingSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Billing & Subscription</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and payment methods
        </p>
      </div>

      <SubscriptionStatus />
      <PaymentMethods />
      <InvoiceHistory />
    </div>
  );
};

export default BillingSettings;