'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ShareSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SUBSCRIPTION_SERVICES = [
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '/netflix-logo.png',
    emailDomain: '@netflix.com'
  },
  {
    id: 'hulu',
    name: 'Hulu',
    logo: '/hulu-logo.png',
    emailDomain: '@hulu.com'
  },
  {
    id: 'max',
    name: 'Max',
    logo: '/max-logo.png',
    emailDomain: '@max.com'
  }
];

export default function ShareSubscriptionModal({ isOpen, onClose, onSuccess }: ShareSubscriptionModalProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionPassword, setSubscriptionPassword] = useState('');
  const [screenCount, setScreenCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        console.error('Auth error:', authError);
        throw new Error('Not authenticated');
      }

      // Share subscription with backend
      const response = await fetch('http://localhost:5002/api/subscriptions/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: session.user.id,
          userEmail: session.user.email,
          service: selectedService,
          email: subscriptionEmail,
          password: subscriptionPassword,
          screenCount: screenCount
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error?.includes('foreign key constraint')) {
          throw new Error('Please complete your profile before sharing a subscription');
        }
        throw new Error(data.error || 'Failed to share subscription');
      }

      // Open Gmail authorization in a new window
      if (data.authUrl) {
        const width = 600;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        window.open(
          data.authUrl,
          'Gmail Authorization',
          `width=${width},height=${height},left=${left},top=${top}`
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error sharing subscription:', err);
      setError('Failed to share subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Share Subscription</h2>
        
        {!selectedService ? (
          <div className="space-y-4">
            <p className="text-gray-300 mb-4">Select your subscription service:</p>
            <div className="grid grid-cols-3 gap-4">
              {SUBSCRIPTION_SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <div className="text-center">
                    <div className="text-white font-semibold">{service.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subscription Email
              </label>
              <input
                type="email"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subscription Password
              </label>
              <input
                type="password"
                value={subscriptionPassword}
                onChange={(e) => setSubscriptionPassword(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Number of Screens Available
              </label>
              <input
                type="number"
                min="1"
                max="4"
                value={screenCount}
                onChange={(e) => {
                  const value = Math.min(4, Math.max(1, Number(e.target.value)));
                  setScreenCount(value);
                }}
                className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:outline-none"
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Sharing...' : 'Share Subscription'}
              </button>
            </div>
          </form>
        )}
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
