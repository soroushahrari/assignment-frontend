'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, SignInResponse } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      setError('Passwords do not match');
      return;
    }

    const result = await signIn('signup', {
      redirect: false,
      email,
      password,
    }) as SignInResponse;

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <div className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Sign Up</div>
        <div className="w-full transform bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-gray-900 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-500 peer-focus:dark:text-sky-500">
            Email
          </label>
        </div>
        <div className="w-full transform bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-gray-900 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-500 peer-focus:dark:text-sky-500">
            Password
          </label>
        </div>
        <div className="w-full transform bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            name="passwordRepeat"
            required
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-stone-200 focus:border-gray-900 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-sky-500 peer-focus:dark:text-sky-500">
            Repeat Password
          </label>
        </div>
        <button
          onClick={handleSignup}
          type="submit"
          className="mt-5 rounded-md bg-sky-600 font-bold hover:bg-sky-950 px-10 py-2 text-white"
        >
          SIGN UP
        </button>
        <p className="text-center text-lg">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Log In
          </a>
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </main>
  );
}
