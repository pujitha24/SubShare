'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute top-0 w-full p-6">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-600">SubShare</h1>
            <Link
              href="/auth/login"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign In
            </Link>
          </nav>
        </div>

        <div className="text-center px-4">
          <h2 className="text-5xl font-bold mb-4">Share Your Subscriptions</h2>
          <p className="text-2xl mb-8">Save money by sharing unused subscription slots.</p>
          <Link
            href="/auth/signup"
            className="bg-red-600 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-red-700"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-gray-400">Share your unused subscription slots and earn money</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
              <p className="text-gray-400">Safe and secure subscription sharing with verified users</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
              <p className="text-gray-400">Get immediate access to shared subscriptions</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to start sharing?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of users who are already saving money with SubShare.</p>
          <Link
            href="/auth/signup"
            className="bg-red-600 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-red-700"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
