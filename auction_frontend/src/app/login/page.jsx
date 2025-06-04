'use client'
import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(prev => ({
            ...prev,
            [name]: ''
        }));
        setApiError(null); // Clear API errors when user types
    };

    const validateForm = () => {
        let isValid = true;
        const newError = {
            email: '',
            password: ''
        };

        if (!formData.email) {
            newError.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newError.email = 'Email is invalid';
            isValid = false;
        } 

        if (!formData.password) {
            newError.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newError.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setError(newError);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setApiError(null);

        try {
            const resp = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.detail);
            }
            localStorage.setItem('token', data.token);
            setIsSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 2000); // Redirect after 2 seconds
        } catch (err) {
            setApiError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className='bg-gray-50'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <Link href='/' className='text-2xl font-black text-gray-950 flex items-center mb-6'>AS</Link>
            
                <div className='w-full text-gray-600 bg-white rounded-lg shadow sm:max-w-md xl:p-0 p-5'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                            Sign in to your account
                        </h1>
                        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label 
                                    htmlFor="email"
                                    className='block text-sm mb-2 font-medium text-gray-900'>
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    id="email"
                                    placeholder="example@gmail.com"
                                    required
                                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {error.email && (
                                    <p className='text-red-600 text-sm mt-1'>{error.email}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className='block mb-2 text-sm font-medium text-gray-900'>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {error.password && (
                                    <p className='text-red-600 text-sm mt-1'>{error.password}</p>
                                )}
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-900">Remember me</span>
                                </label>
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-blue-300 font-medium px-5 py-2.5 text-center ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </button>
                            
                            {apiError && (
                                <p className='text-red-600 text-sm'>{apiError}</p>
                            )}
                            {isSuccess && (
                                <p className='text-green-600 text-sm'>Login successful! Redirecting...</p>
                            )}
                            
                            <p className='text-sm font-light text-gray-500'>
                                Don't have an account yet?{' '}
                                <Link href="/register" className='hover:text-blue-600 font-medium'>
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div> 
            </div>
        </section>
    );
}

export default Login;