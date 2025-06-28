import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

// API base URL - replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Stripe service class
class StripeService {
  constructor() {
    this.stripe = null;
    this.init();
  }

  async init() {
    this.stripe = await stripePromise;
  }

  // Create a checkout session for subscription
  async createCheckoutSession(priceId, customerId = null, metadata = {}) {
    try {
      const response = await axios.post(`${API_BASE_URL}/stripe/create-checkout-session`, {
        priceId,
        customerId,
        metadata,
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/pricing`
      });

      return response.data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  // Redirect to Stripe Checkout
  async redirectToCheckout(sessionId) {
    if (!this.stripe) {
      await this.init();
    }

    const { error } = await this.stripe.redirectToCheckout({
      sessionId
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  }

  // Create a customer portal session
  async createPortalSession(customerId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/stripe/create-portal-session`, {
        customerId,
        returnUrl: `${window.location.origin}/settings?tab=billing`
      });

      return response.data;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  }

  // Get subscription details
  async getSubscription(subscriptionId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/stripe/subscription/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      throw error;
    }
  }

  // Get customer details
  async getCustomer(customerId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/stripe/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  // Get invoices for a customer
  async getInvoices(customerId, limit = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/stripe/invoices/${customerId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  }

  // Update subscription
  async updateSubscription(subscriptionId, updates) {
    try {
      const response = await axios.put(`${API_BASE_URL}/stripe/subscription/${subscriptionId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId, cancelAtPeriodEnd = true) {
    try {
      const response = await axios.post(`${API_BASE_URL}/stripe/subscription/${subscriptionId}/cancel`, {
        cancelAtPeriodEnd
      });
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  // Format currency
  formatCurrency(amount, currency = 'usd') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  }

  // Format date
  formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

export default new StripeService();