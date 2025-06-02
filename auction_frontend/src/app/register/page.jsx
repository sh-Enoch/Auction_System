'use client';
import React from 'react'
import Link from 'next/link';
import  { useState } from 'react';
import { useRouter } from 'next/router'


function Register() {


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmedPassword] = useState(false);
    


    
    const handleChange = (e) => {
        const {name, value } = e.target;
            setFormData( prev => ({
                ...prev,
                [name]: value
            }));
            setError(prev => ({
                ...prev,
                [name]: ''
            }));
        
        };

    const validateForm = () => {
        let isValid = true;
        const newError = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!formData.username.trim()) {
            newError.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 3) {
            newError.username = 'Username must be at least 3 characters long';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newError.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newError.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.password) {
            newError.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newError.password = 'Password must be at least 6 characters long';
            isValid = false;
        } else if (!/[A-Z]/.test(formData.password)) {
            newError.password = 'Password must contain at least one uppercase letter';
            isValid = false;
        } else if (!/[0-9]/.test(formData.password)) {
            newError.password = 'Password must contain at least one number';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newError.confirmPassword = 'Confirm your password';
            isValid = false;
        } else if (formData.confirmPassword !== formData.password) {
            newError.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setError(newError);
        return isValid;
    }

        

    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [error, setError] = useState('');

    // const handleNameChange = (e) => {
    //     setUsername(e.target.value);
    // }
    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // }
    // const handleConfirmPasswordChange = (e) => {
    //     setConfirmPassword(e.target.value);
    // }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmedPassword(!showConfirmPassword);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        

        if (validateForm()) {
            console.log("Form is valid, submitting...", formData);

            // Here you would typically send the form data to your backend API
            const {confirmPassword, ...submitData} = formData;
            const url = "http://localhost:8000/api/auth/register";

            fetch(
                url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submitData)
                }
            ).then(
                resp => resp.json()
            ).then(
                data => {
                    if(data.success) {
                        console.log("Registration successful:", data);
                        // Redirect to login or home page
                        Router.push('/login');
                    } else {
                        console.error("Registration failed:", data);
                        setError({ ...error, general: data.error || 'Registration failed. Please try again.' });
                    }
                }
            ).catch(
                err => {
                console.error("Error during registration:", err);
                setError({ ...error, general: 'Registration failed. Please try again.' });
            });

        }

    };

  return (

        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href='/' className="text-2xl font-black text-gray-950 flex items-center mb-6">AS</Link>
            
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Create an account </h1>
                
                <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label 
                        htmlFor="username" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Username"
                        required 
                        />
                        {error.username && ( <p className="text-red-500 text-sm">{error.username}</p>)}

                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="email" 
                        required 
                        />
                        {error.email && ( <p className="text-red-500 text-sm">{error.email}</p>)}
                
                    </div>

                    <div className='relative'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input 
                        type={showPassword ? 'text' : 'password'} 
                        name="password" 
                        id="password"
                        value={formData.password}
                        onChange={handleChange} 
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         required
                          />
                          <button
                            type='button'
                            onClick={togglePasswordVisibility}
                            className='absolute right-2.5 bottom-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            >
                        
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />  
                                </svg>
                            ): (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            ) } 
                          </button>
                          { error.password && ( <p className="text-red-500 text-sm">{error.password}</p>)}

                    </div>

                    <div className='relative'>
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword" 
                        id="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         required 
                         />
                         <button
                            type='button'
                            onClick={toggleConfirmPasswordVisibility}
                            className='absolute right-2.5 bottom-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            >
                        
                            {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />  
                                </svg>
                            ): (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            ) } 
                          </button>

                    </div>
                    {error.confirmPassword && <p className="text-red-500 text-sm">{error}</p>}

                    <button 
                    className='w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4  focus:outline-none font-medium text-sm px-5 py-2.5 text-center rounded-lg'> Create an account</button>

                </form> 
                 
                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
            </p>
                </div>
               
            </div>
            
          

            </div>
        </section>
   
  )
}

export default Register