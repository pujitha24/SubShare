'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/streaming-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="w-full max-w-md p-8 bg-black bg-opacity-75 rounded-lg">
        <Link href="/" className="block mb-8">
          <h1 className="text-3xl font-bold text-red-600">SubShare</h1>
        </Link>
        <h2 className="text-3xl font-bold text-white mb-8">Sign In</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-600 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition duration-200"
          >
            Sign In
          </button>
          <p className="text-gray-400 text-center">
            New to SubShare?{' '}
            <Link href="/auth/signup" className="text-white hover:underline">
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
