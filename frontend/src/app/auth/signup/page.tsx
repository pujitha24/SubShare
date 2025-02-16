'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`
        }
      });

      if (authError) throw authError;

      setSuccess(true);
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  if (success) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-black bg-opacity-90"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/streaming-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full max-w-md p-8 bg-black bg-opacity-75 rounded-lg text-center">
          <Link href="/" className="block mb-8">
            <h1 className="text-3xl font-bold text-red-600">SubShare</h1>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
          <p className="text-gray-300 mb-6">
            A confirmation link has been sent to {email}. Please check your email to complete the signup process.
          </p>
          <Link
            href="/auth/login"
            className="text-red-600 hover:text-red-500 font-semibold"
          >
            Return to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-black bg-opacity-90"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/streaming-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md p-8 bg-black bg-opacity-75 rounded-lg">
        <Link href="/" className="block mb-8">
          <h1 className="text-3xl font-bold text-red-600">SubShare</h1>
        </Link>
        <h2 className="text-3xl font-bold text-white mb-8">Sign Up</h2>
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
              autoComplete="username"
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
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition duration-200"
          >
            Sign Up
          </button>
          <p className="text-gray-400 text-center">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-white hover:underline">
              Sign in now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
