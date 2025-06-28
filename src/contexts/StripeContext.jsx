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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data - replace with your actual user context
  const [user] = useState({
    id: 'user_123',
    stripeCustomerId: 'cus_example123',
    subscriptionId: 'sub_example123'
  });

  useEffect(() => {
    if (user?.stripeCustomerId) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load subscription data
      if (user.subscriptionId) {
        const subscriptionData = await stripeService.getSubscription(user.subscriptionId);
        setSubscription(subscriptionData);
      }

      // Load customer data
      if (user.stripeCustomerId) {
        const customerData = await stripeService.getCustomer(user.stripeCustomerId);
        setCustomer(customerData);

        // Load invoices
        const invoicesData = await stripeService.getInvoices(user.stripeCustomerId);
        setInvoices(invoicesData.data || []);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async (priceId, metadata = {}) => {
    try {
      setError(null);
      const session = await stripeService.createCheckoutSession(
        priceId,
        user?.stripeCustomerId,
        metadata
      );
      
      await stripeService.redirectToCheckout(session.id);
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

      const session = await stripeService.createPortalSession(user.stripeCustomerId);
      window.location.href = session.url;
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

      const updatedSubscription = await stripeService.updateSubscription(
        user.subscriptionId,
        updates
      );
      setSubscription(updatedSubscription);
      return updatedSubscription;
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

      const canceledSubscription = await stripeService.cancelSubscription(
        user.subscriptionId,
        cancelAtPeriodEnd
      );
      setSubscription(canceledSubscription);
      return canceledSubscription;
    } catch (err) {
      console.error('Error canceling subscription:', err);
      setError(err.message);
      throw err;
    }
  };

  const refreshData = () => {
    if (user?.stripeCustomerId) {
      loadUserData();
    }
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