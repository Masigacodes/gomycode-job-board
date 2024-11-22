// components/Login.tsx

import { signIn } from 'next-auth/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Email Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/',
      });

      if (res?.error) {
        setError('Failed to log in. Please check your email.');
      } else {
        alert('A magic link has been sent to your email!');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* Display any login errors */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Google Login Button */}
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md mb-4 hover:bg-red-600"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>

      {/* Email Login Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login with Email'}
        </button>
      </form>
    </div>
  );
};

export default Login;
