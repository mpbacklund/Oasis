import { useState } from 'react'
import { NavLink } from 'react-router'

const StartPage = () => {
  return (
    <>
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">GameHub</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-8">Welcome to GameHub</h2>
          {/* Buttons */}
          <div className="space-y-4">
          <NavLink
            to="/host/start"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 block text-center"
            >
            Host a Game
            </NavLink>

            <NavLink
            to="/player/start"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 block text-center"
            >
            Join a Game
            </NavLink>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default StartPage