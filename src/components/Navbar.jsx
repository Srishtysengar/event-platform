import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600 cursor-pointer">
          Eventify
        </div>

        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li className="hover:text-indigo-600 cursor-pointer">Home</li>
          <li className="hover:text-indigo-600 cursor-pointer">Events</li>
          <li className="hover:text-indigo-600 cursor-pointer">About</li>
          <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
        </ul>

        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition">
            Login
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </div>


        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <span className="text-2xl">&#9776;</span>
          )}
        </button>
      </div>


      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li className="hover:text-indigo-600 cursor-pointer">Home</li>
            <li className="hover:text-indigo-600 cursor-pointer">Events</li>
            <li className="hover:text-indigo-600 cursor-pointer">About</li>
            <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
          </ul>
          <div className="mt-4 flex flex-col space-y-3">
            <button className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
