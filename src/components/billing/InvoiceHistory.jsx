import React, { useState } from 'react';
import { BiDownload, BiShow, BiCalendar, BiDollar } from 'react-icons/bi';
import { useStripe } from '../../contexts/StripeContext';

const InvoiceHistory = () => {
  const { invoices, loading, error, stripeService } = useStripe();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Mock invoices for demo if no real data
  const mockInvoices = [
    {
      id: 'in_1234567890',
      number: 'INV-2024-001',
      status: 'paid',
      amount_paid: 39300,
      currency: 'usd',
      created: Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60), // 7 days ago
      period_start: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60),
      period_end: Math.floor(Date.now() / 1000),
      hosted_invoice_url: '#',
      invoice_pdf: '#'
    },
    {
      id: 'in_0987654321',
      number: 'INV-2024-002',
      status: 'paid',
      amount_paid: 39300,
      currency: 'usd',
      created: Math.floor(Date.now() / 1000) - (37 * 24 * 60 * 60), // 37 days ago
      period_start: Math.floor(Date.now() / 1000) - (60 * 24 * 60 * 60),
      period_end: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60),
      hosted_invoice_url: '#',
      invoice_pdf: '#'
    }
  ];

  const displayInvoices = invoices.length > 0 ? invoices : mockInvoices;

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'void':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadInvoice = (invoice) => {
    if (invoice.invoice_pdf) {
      window.open(invoice.invoice_pdf, '_blank');
    }
  };

  const handleViewInvoice = (invoice) => {
    if (invoice.hosted_invoice_url) {
      window.open(invoice.hosted_invoice_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Invoice History</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <BiCalendar className="h-4 w-4" />
            <span>Last 12 months</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <p className="text-red-600 text-sm">Error loading invoices: {error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BiDollar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.number || invoice.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stripeService.formatDate(invoice.period_start)} - {stripeService.formatDate(invoice.period_end)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stripeService.formatCurrency(invoice.amount_paid, invoice.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stripeService.formatDate(invoice.created)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleViewInvoice(invoice)}
                      className="text-primary-600 hover:text-primary-900 p-1"
                      title="View Invoice"
                    >
                      <BiShow className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="text-primary-600 hover:text-primary-900 p-1"
                      title="Download PDF"
                    >
                      <BiDownload className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayInvoices.length === 0 && !loading && (
        <div className="px-6 py-12 text-center">
          <BiDollar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your invoice history will appear here once you have an active subscription.
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceHistory;