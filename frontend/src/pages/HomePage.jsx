import React from 'react'
import { useAuth } from '../context/AuthContext'

function HomePage() {
    const {authState} = useAuth();
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
      {authState.isAuthenticated ? (
        <h2 className="text-2xl font-bold">Welcome, {authState.user?.username}!</h2>
      ) : (
        <h2 className="text-2xl font-bold">Welcome to our website!</h2>
      )}
    </div>
  </div>
);
}

export default HomePage
