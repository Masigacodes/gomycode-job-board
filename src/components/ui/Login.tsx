// components/Login.tsx

import { signIn } from 'next-auth/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Handle Email login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn('email', { email, redirect: false });
    } catch (err) {
      console.error(err);
      setError('Failed to log in with email');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* Display any login errors */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Google Login Button */}
      <button
        onClick={() => signIn('google')}
        className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md mb-4 hover:bg-red-600"
      >
        Sign in with Google
      </button>

      {/* Email Login Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login with Email
        </button>
      </form>
    </div>
  );
};

export default Login;
