import React from 'react';
import { BiCheck, BiUser, BiBuilding } from 'react-icons/bi';
import { useStripe } from '../contexts/StripeContext';

const Pricing = () => {
  const { createCheckoutSession, loading } = useStripe();

  const plans = [
    {
      name: 'Small Gym',
      subtitle: '< 50 members',
      price: 99,
      priceId: 'price_small_gym', // Replace with actual Stripe price ID
      description: 'Perfect for small gyms and studios',
      features: [
        'Up to 50 members',
        'Basic payroll processing',
        'Email support',
        'Basic analytics',
        'Single location'
      ],
      icon: BiUser,
      popular: false
    },
    {
      name: 'Medium Gym',
      subtitle: '50 - 200 members',
      price: 199,
      priceId: 'price_medium_gym', // Replace with actual Stripe price ID
      description: 'Ideal for growing fitness businesses',
      features: [
        'Up to 200 members',
        'Advanced payroll features',
        'Priority support',
        'Advanced analytics',
        'Multi-location support'
      ],
      icon: BiBuilding,
      popular: true
    },
    {
      name: 'Large Gym',
      subtitle: '200 - 500 members',
      price: 299,
      priceId: 'price_large_gym', // Replace with actual Stripe price ID
      description: 'For established fitness centers',
      features: [
        'Up to 500 members',
        'Advanced payroll features',
        'Priority support',
        'Custom reporting',
        'Multi-location management'
      ],
      icon: BiBuilding,
      popular: false
    },
    {
      name: 'Gym Chain',
      subtitle: '5 - 10 branches',
      price: 499,
      priceId: 'price_gym_chain', // Replace with actual Stripe price ID
      description: 'For gym chains and franchises',
      features: [
        'Multiple locations',
        'Custom payroll rules',
        '24/7 dedicated support',
        'Custom reporting',
        'Franchise management'
      ],
      icon: BiBuilding,
      popular: false
    }
  ];

  const handleSubscribe = async (plan) => {
    try {
      await createCheckoutSession(plan.priceId, {
        plan_name: plan.name,
        plan_price: plan.price
      });
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      // Fallback to direct Stripe links for demo
      const fallbackLinks = {
        'price_small_gym': 'https://buy.stripe.com/aEUg2l6Bi74v0xy3cf',
        'price_medium_gym': 'https://buy.stripe.com/aEUaI1e3K60rbcc7su',
        'price_large_gym': 'https://buy.stripe.com/dR6dUd5xe60r800000',
        'price_gym_chain': 'https://buy.stripe.com/00gbM55xebkLa887st'
      };
      
      if (fallbackLinks[plan.priceId]) {
        window.open(fallbackLinks[plan.priceId], '_blank');
      }
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your gym's needs
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-blue-50 rounded-lg p-4 max-w-md">
              <p className="text-sm text-blue-800">
                <strong>All plans include:</strong> Secure payments, automated billing, 
                instructor management, and 24/7 support
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-lg bg-white p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 -mt-4 mr-4 rounded-full bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </span>
              )}

              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                <plan.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-sm text-primary-600 font-medium">{plan.subtitle}</p>
              <p className="mt-2 text-gray-500">{plan.description}</p>

              <div className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </div>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <BiCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-md shadow transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200 disabled:bg-gray-100'
                  } ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need a custom solution?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact us for enterprise pricing and custom features for larger gym chains.
          </p>
          <button className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;