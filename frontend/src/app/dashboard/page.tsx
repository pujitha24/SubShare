'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import ShareSubscriptionModal from '../../components/ShareSubscriptionModal';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
      } else {
        setUserEmail(session.user?.email || null);
        fetchSubscriptions(session.user.id);
      }
      setLoading(false);
    };

    checkSession();
  }, [router]);

  const fetchSubscriptions = async (userId: string) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      setSubscriptions(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const handleSubscriptionSuccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await fetchSubscriptions(session.user.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-90 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-red-600">
              SubShare
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Subscriptions */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Active Subscriptions</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Share New Subscription
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.length === 0 ? (
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">No active subscriptions</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-red-600 hover:text-red-500"
                  >
                    Share your first subscription
                  </button>
                </div>
              </div>
            ) : (
              subscriptions.map((subscription) => (
                <div 
                  key={subscription.id} 
                  className="bg-gray-900 rounded-lg p-6 border border-gray-800"
                >
                  <h3 className="text-xl font-semibold mb-2">{subscription.service}</h3>
                  <p className="text-gray-400">{subscription.email}</p>
                  <p className="text-gray-400 mt-2">
                    Status: {subscription.status}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Available Subscriptions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Available Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty State */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-center">
                <p className="text-gray-400 mb-4">No subscriptions available</p>
                <button className="text-red-600 hover:text-red-500">
                  Check back later
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Share Subscription Modal */}
      <ShareSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSubscriptionSuccess}
      />
    </div>
  );
}
