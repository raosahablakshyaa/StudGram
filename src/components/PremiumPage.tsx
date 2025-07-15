import React, { useState } from 'react';
import { Crown, Check, Star, Zap, Users, BookOpen, Video, MessageCircle, Shield, Sparkles, Calendar, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface PremiumFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  available: boolean;
}

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  popular: boolean;
  features: string[];
  color: string;
}

export const PremiumPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addNotification } = useNotifications();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const premiumFeatures: PremiumFeature[] = [
    {
      icon: Video,
      title: 'Unlimited Video Sessions',
      description: 'Connect with mentors through HD video calls with no time limits',
      available: true
    },
    {
      icon: MessageCircle,
      title: 'Priority Chat Support',
      description: 'Get instant responses from mentors and support team',
      available: true
    },
    {
      icon: BookOpen,
      title: 'Exclusive Study Materials',
      description: 'Access premium notes, guides, and practice tests',
      available: true
    },
    {
      icon: Users,
      title: 'Private Study Groups',
      description: 'Join exclusive study groups with like-minded students',
      available: true
    },
    {
      icon: Shield,
      title: 'Ad-Free Experience',
      description: 'Enjoy StudGram without any advertisements',
      available: true
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Get personalized learning recommendations',
      available: true
    },
    {
      icon: Calendar,
      title: 'Advanced Scheduling',
      description: 'Book sessions up to 30 days in advance',
      available: true
    },
    {
      icon: Award,
      title: 'Certification Programs',
      description: 'Earn verified certificates for completed courses',
      available: true
    }
  ];

  const plans: PremiumPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingPeriod === 'monthly' ? 9.99 : 99.99,
      period: billingPeriod,
      popular: false,
      features: [
        '5 mentor sessions per month',
        'Basic chat support',
        'Community access',
        'Mobile app access'
      ],
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 19.99 : 199.99,
      period: billingPeriod,
      popular: true,
      features: [
        'Unlimited mentor sessions',
        'Priority chat support',
        'Exclusive study materials',
        'Private study groups',
        'Ad-free experience',
        'AI-powered insights'
      ],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 39.99 : 399.99,
      period: billingPeriod,
      popular: false,
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        'Team collaboration tools',
        'Priority support'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleUpgrade = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      updateUser({ isPremium: true });
      addNotification({
        type: 'premium',
        title: 'Welcome to Premium!',
        message: `You've successfully upgraded to ${plan.name}. Enjoy your premium benefits!`
      });
    }
  };

  const stats = [
    { label: 'Happy Students', value: '10K+', icon: Users },
    { label: 'Expert Mentors', value: '500+', icon: Award },
    { label: 'Success Rate', value: '96%', icon: Star },
    { label: 'Sessions Daily', value: '1000+', icon: Video }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 animate-pulse">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Unlock Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learning Potential
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students who are accelerating their academic success with Studgram Premium
            </p>
            
            {user?.isPremium && (
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full mb-8">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">You're already a Premium member!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Choose Your Plan
          </h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-white/20">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">
                      /{plan.period === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${(plan.price / 10).toFixed(0)} per month
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={user?.isPremium}
                  className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {user?.isPremium ? 'Current Plan' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Computer Science Student',
                content: 'StudGram Premium transformed my learning experience. The mentors are incredibly knowledgeable and always available when I need help.',
                rating: 5
              },
              {
                name: 'Mike Chen',
                role: 'Physics Major',
                content: 'The AI-powered insights helped me identify my weak areas and improve my study efficiency. Highly recommend!',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                role: 'Mathematics Student',
                content: 'The premium study materials and exclusive content are worth every penny. My grades have improved significantly.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful students who chose StudyConnect Premium
          </p>
          <button
            onClick={() => handleUpgrade('pro')}
            disabled={user?.isPremium}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {user?.isPremium ? 'You\'re Premium!' : 'Start Premium Today'}
          </button>
        </div>
      </div>
    </div>
  );
};