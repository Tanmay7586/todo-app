'use client';
import Link from 'next/link';
import { useState } from 'react';
export default function LoginComponent({ onLogin, onGoogleLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <button
        onClick={onGoogleLogin}
        disabled={loading}
        className="w-full mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-red-400"
      >
        Sign in with Google
      </button>
      
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}