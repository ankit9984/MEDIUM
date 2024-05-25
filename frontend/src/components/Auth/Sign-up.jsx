import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, error } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='mb-4'>
          <label className='block text-black' htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username...'
            className='mt-1 p-2 w-full border rounded-lg focus:outline-none'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-black' htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email...'
            className='mt-1 p-2 w-full border rounded-lg focus:outline-none'
          />
        </div>

        <div className='mb-4 relative'>
          <label className='block text-black' htmlFor='password'>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='mt-1 p-2 w-full border rounded-lg focus:outline-none'
          />
          <button type='button' onClick={togglePasswordVisibility} className='absolute top-[60%] right-3'>
            {showPassword ? <FaEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <button type='submit' className='w-full bg-black text-white p-2 rounded-lg hover:bg-gray-600'>
          Register
        </button>

        <div className='mt-4 text-center'>
          <span className='text-gray-600'>Already have an account? </span>
          <Link to='/login' className='text-black hover:underline'>Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;