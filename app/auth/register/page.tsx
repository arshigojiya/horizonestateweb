'use client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent the form from submitting

        try {
            const response = await fetch('/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                alert('User signed up successfully');
            } else {
                const errorData = await response.json(); // Handle errors if response is not ok
                console.error('Signup failed:', errorData);
                alert('Signup failed. Please try again.'); // Optionally alert the user
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
            alert('An error occurred. Please try again later.'); // Handle network or other errors
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}> {/* Added onSubmit here */}
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                value={username}
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                                className="relative block w-full appearance-none rounded mb-3 border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="User name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded mb-3 border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                autoComplete="new-password"
                                required
                                className="relative block w-full appearance-none rounded mb-3 border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                required // Ensure the checkbox is required for signup
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">terms and conditions</a>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit" // Use type="submit" to trigger form submission
                            className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-[#e74d3c] to-indigo-600 py-2 px-4 text-sm font-medium text-white hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-green-400 group-hover:text-green-300" aria-hidden="true" />
                            </span>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
