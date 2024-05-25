
## Tailwind Configuration

To enable the responsive behavior, the following custom breakpoints are defined in the Tailwind CSS configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'custom-max': {'max': '500px'}, // for max-width: 500px
        'custom-min': '501px', // for min-width: 501px
      },
    },
  },
  variants: {},
  plugins: [],
};
```

# NAVBAR => src\components\Navbar.jsx

``` jsx
import React, { useState } from 'react'
import { CiSearch, CiEdit, CiBookmark } from "react-icons/ci";
import { IoMdNotifications, IoIosStats } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const isAuthorized = true;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className='shadow-xl h-16 pt-2.5'>
            <nav className='flex justify-between items-center '>
                <div className='flex gap-2 items-center'>
                    <div className='w-14 h-10 bg-red-400 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={logo} alt="" />
                    </div>
                    <div className='custom-max:hidden relative shadow-lg'>
                        <input
                            type="text"
                            placeholder='Search here'
                            className='shadow-md p-2 pl-8 rounded-lg focus:outline-none w-full' />
                        <CiSearch className='absolute text-2xl left-2 top-1/4 text-gray-500 ' />
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <CiSearch className='text-3xl  custom-min:hidden' />
                    {isAuthorized ?
                        <div className='flex items-center justify-between gap-5'>
                            <div className='custom-max:hidden flex items-center gap-2 text-xl cursor-pointer group'>
                                <CiEdit className='text-2xl group-hover:text-green-400' />
                                <span>Write</span>
                            </div>
                            <IoMdNotifications className='text-3xl cursor-pointer' />
                            <div className='relative border-rose-400 border-2'>
                                <div onClick={toggleDropDown} className='w-14 h-10 bg-red-400 rounded-full overflow-hidden cursor-pointer'>
                                    <img className='w-full h-full object-cover' src={logo} alt="" />
                                </div>
                                {isOpen && (
                                    <div className='absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg'>
                                        <ul>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 '>
                                                <FaRegUser className='text-2xl' />
                                                <li className='text-xl'>Profile</li>
                                            </div>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 '>
                                                <CiBookmark className='text-2xl' />
                                                <li className='text-xl'>Libary</li>
                                            </div>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 '>
                                                <MdContentCopy className='text-2xl' />
                                                <li className='text-xl'>Stories</li>
                                            </div>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 '>
                                                <IoIosStats className='text-2xl' />
                                                <li className='text-xl'>Stories</li>
                                            </div>
                                        </ul>
                                        <ul className='w-full border my-2'></ul>
                                        <ul>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Setting</li>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Refine recommendations</li>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Manage publications</li>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Help</li>
                                        </ul>
                                        <ul className='w-full border my-2'></ul>
                                        <div className='px-4 py-2 items-center cursor-pointer'>
                                            <p>Sign out</p>
                                            <span>abc@gmail.com</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <Link to='/'><button className='bg-black text-white px-2 py-1 rounded-lg'>Sign-up</button></Link>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar

```
# SIGNUP => src\components\Auth\Sign-up.jsx

```jsx
import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>
        
        <div className='mb-4'>
          <label className='block text-black' htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <span className='text-gray-600t'>Already have an account? </span>
          <Link to='/login' className='text-black hover:underline'>Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
```

# SIGNIN => src\components\Auth\Sign-in.jsx

```JSX
import React, { useState } from 'react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { username, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        
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
          Login
        </button>

        <div className='mt-4 text-center'>
          <span className='text-gray-600'>Don't have an account? </span>
          <Link to='/sign-up' className='text-black hover:underline'>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
```