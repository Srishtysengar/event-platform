import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate(); 

  const handleScrollToEvents = () => {
    const element = document.getElementById("events");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center bg-indigo-50 text-center px-6"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-indigo-700">
        Welcome to Eventify
      </h1>
      <p className="text-xl md:text-2xl mb-6 text-gray-700 max-w-2xl">
        Create, manage, and share your own events with friends and attendees – all in one platform!
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleScrollToEvents}
          className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition"
        >
          View Events
        </button>
        <button
          onClick={() => navigate("/signup")} 
          className="px-8 py-4 border border-indigo-600 text-indigo-600 rounded-full text-lg font-medium hover:bg-indigo-600 hover:text-white transition"
        >
          Get Started
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Create Events</h3>
      <p>Add images, videos, date/time, and location for your events.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Manage RSVPs</h3>
      <p>Track who’s attending, maybe, or not attending easily.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Share Invitations</h3>
      <p>Send personalized invitations and share on social media.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Event History</h3>
      <p>Keep track of past events you created or attended.</p>
    </div>
  </div>
    </section>
  );
}
