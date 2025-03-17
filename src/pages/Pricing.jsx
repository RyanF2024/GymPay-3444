import React from 'react';
import {BiCheck, BiUser, BiBuilding} from 'react-icons/bi';

const Pricing = () => {
  const plans = [
    {
      name: 'Small Gym (<50 members)',
      price: 99,
      description: 'Perfect for small gyms and studios',
      features: [
        'Up to 50 members',
        'Basic payroll processing',
        'Email support',
        'Basic analytics',
        'Single location'
      ],
      icon: BiUser,
      paymentLink: 'https://buy.stripe.com/aEUg2l6Bi74v0xy3cf'
    },
    {
      name: 'Medium Gym (50 - 200 members)',
      price: 199,
      description: 'Ideal for growing fitness businesses',
      features: [
        'Up to 200 members',
        'Advanced payroll features',
        'Priority support',
        'Advanced analytics',
        'Multi-location support'
      ],
      icon: BiBuilding,
      paymentLink: 'https://buy.stripe.com/aEUaI1e3K60rbcc7su',
      popular: true
    },
    {
      name: 'Large Gym (200 - 500 members)',
      price: 299,
      description: 'For established fitness centers',
      features: [
        'Up to 500 members',
        'Advanced payroll features',
        'Priority support',
        'Custom reporting',
        'Multi-location management'
      ],
      icon: BiBuilding,
      paymentLink: 'https://buy.stripe.com/dR6dUd5xe60r800000'
    },
    {
      name: 'Gym Chain (5 - 10 branches)',
      price: 499,
      description: 'For gym chains and franchises',
      features: [
        'Multiple locations',
        'Custom payroll rules',
        '24/7 dedicated support',
        'Custom reporting',
        'Franchise management'
      ],
      icon: BiBuilding,
      paymentLink: 'https://buy.stripe.com/00gbM55xebkLa887st'
    }
  ];

  const handleSubscribe = (paymentLink) => {
    window.open(paymentLink, '_blank');
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your gym's needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-lg bg-white p-8 ${
                plan.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 -mt-4 mr-4 rounded-full bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                  Popular
                </span>
              )}

              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600">
                <plan.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 text-gray-500">{plan.description}</p>

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
                  onClick={() => handleSubscribe(plan.paymentLink)}
                  className={`w-full py-3 px-4 rounded-md shadow ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;