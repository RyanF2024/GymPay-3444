import React, { createContext, useContext, useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import stripeService from '../services/stripe';

const StripeContext = createContext();

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

export const StripeProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock user data - replace with your actual user context
  const [user] = useState({
    id: 'user_123',
    stripeCustomerId: 'cus_example123',
    subscriptionId: 'sub_example123'
  });

  useEffect(() => {
    // Check if backend is available
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/test`);
      if (response.ok) {
        console.log('✅ Backend connection successful');
        // Load real data if backend is available
        loadUserData();
      } else {
        console.log('⚠️ Backend not available, using mock data');
        loadMockData();
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using mock data');
      loadMockData();
    }
  };

  const loadMockData = () => {
    setSubscription({
      id: 'sub_example123',
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
      items: {
        data: [{
          price: {
            unit_amount: 24900,
            currency: 'usd',
            nickname: 'Professional Plan'
          }
        }]
      }
    });

    setCustomer({
      id: 'cus_example123',
      email: 'demo@example.com',
      payment_methods: [
        {
          id: 'pm_1234567890',
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2024
          },
          is_default: true
        }
      ]
    });

    setInvoices([
      {
        id: 'in_1234567890',
        number: 'INV-2024-001',
        status: 'paid',
        amount_paid: 39300,
        currency: 'usd',
        created: Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60),
        period_start: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60),
        period_end: Math.floor(Date.now() / 1000),
        hosted_invoice_url: '#',
        invoice_pdf: '#'
      }
    ]);
  };

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load real data from backend
      if (user.subscriptionId) {
        const subscriptionData = await stripeService.getSubscription(user.subscriptionId);
        setSubscription(subscriptionData);
      }

      if (user.stripeCustomerId) {
        const customerData = await stripeService.getCustomer(user.stripeCustomerId);
        setCustomer(customerData);

        const invoicesData = await stripeService.getInvoices(user.stripeCustomerId);
        setInvoices(invoicesData.data || []);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      setError(err.message);
      // Fallback to mock data
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async (priceId, metadata = {}) => {
    try {
      setError(null);
      
      // Try backend first
      try {
        const session = await stripeService.createCheckoutSession(
          priceId,
          user?.stripeCustomerId,
          metadata
        );
        
        await stripeService.redirectToCheckout(session.id);
        return;
      } catch (backendError) {
        console.log('Backend not available, using fallback links');
      }

      // Fallback to direct Stripe links for demo
      const fallbackLinks = {
        'price_small_gym': 'https://buy.stripe.com/aEUg2l6Bi74v0xy3cf',
        'price_medium_gym': 'https://buy.stripe.com/aEUaI1e3K60rbcc7su',
        'price_large_gym': 'https://buy.stripe.com/dR6dUd5xe60r800000',
        'price_gym_chain': 'https://buy.stripe.com/00gbM55xebkLa887st'
      };
      
      if (fallbackLinks[priceId]) {
        window.open(fallbackLinks[priceId], '_blank');
      } else {
        throw new Error('No fallback link available for this price ID');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err.message);
      throw err;
    }
  };

  const openCustomerPortal = async () => {
    try {
      setError(null);
      
      if (!user?.stripeCustomerId) {
        throw new Error('No customer ID found');
      }

      try {
        const session = await stripeService.createPortalSession(user.stripeCustomerId);
        window.location.href = session.url;
      } catch (backendError) {
        // Show a message that this feature requires a backend
        alert('Customer portal requires a backend server. This is a demo environment.');
      }
    } catch (err) {
      console.error('Error opening customer portal:', err);
      setError(err.message);
      throw err;
    }
  };

  const updateSubscription = async (updates) => {
    try {
      setError(null);
      
      if (!user?.subscriptionId) {
        throw new Error('No subscription ID found');
      }

      try {
        const updatedSubscription = await stripeService.updateSubscription(
          user.subscriptionId,
          updates
        );
        setSubscription(updatedSubscription);
        return updatedSubscription;
      } catch (backendError) {
        alert('Subscription updates require a backend server. This is a demo environment.');
      }
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError(err.message);
      throw err;
    }
  };

  const cancelSubscription = async (cancelAtPeriodEnd = true) => {
    try {
      setError(null);
      
      if (!user?.subscriptionId) {
        throw new Error('No subscription ID found');
      }

      try {
        const canceledSubscription = await stripeService.cancelSubscription(
          user.subscriptionId,
          cancelAtPeriodEnd
        );
        setSubscription(canceledSubscription);
        return canceledSubscription;
      } catch (backendError) {
        alert('Subscription cancellation requires a backend server. This is a demo environment.');
      }
    } catch (err) {
      console.error('Error canceling subscription:', err);
      setError(err.message);
      throw err;
    }
  };

  const refreshData = () => {
    checkBackendConnection();
  };

  const value = {
    subscription,
    customer,
    invoices,
    loading,
    error,
    user,
    createCheckoutSession,
    openCustomerPortal,
    updateSubscription,
    cancelSubscription,
    refreshData,
    stripeService
  };

  return (
    <StripeContext.Provider value={value}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};