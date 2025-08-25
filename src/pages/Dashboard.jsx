import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">Eventify</h1>
        <nav className="flex flex-col gap-4">
          <NavLink to="" end className="px-3 py-2 rounded hover:bg-indigo-500">
            🏠 Dashboard
          </NavLink>
          <NavLink to="events" className="px-3 py-2 rounded hover:bg-indigo-500">
            📅 My Events
          </NavLink>
          <NavLink to="create" className="px-3 py-2 rounded hover:bg-indigo-500">
            ✨ Create Event
          </NavLink>
          <NavLink to="rsvps" className="px-3 py-2 rounded hover:bg-indigo-500">
            📨 RSVPs
          </NavLink>
          <NavLink
            to="notifications"
            className="px-3 py-2 rounded hover:bg-indigo-500"
          >
            🔔 Notifications
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white shadow px-8 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome, {currentUser?.email.split("@")[0]} 👋
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{currentUser?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
            >
              🚪 Logout
            </button>
          </div>
        </header>

        {/* Render nested pages here */}
        <div className="flex-1 p-8">
          {location.pathname === "/dashboard" ? (
            <>
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-8 mb-8">
                <h1 className="text-3xl font-bold mb-2">Hello {currentUser?.email.split("@")[0]} 🎉</h1>
                <p className="text-lg">
                  Plan, create, and share your events effortlessly with Eventify.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-indigo-600">Upcoming Events</h3>
                  <p className="text-3xl font-bold mt-2">3</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-green-600">RSVPs Received</h3>
                  <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-yellow-600">Notifications</h3>
                  <p className="text-3xl font-bold mt-2">5</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-700">Recent Activity</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>✅ You created an event <strong>Team Outing</strong></li>
                  <li>📩 5 people RSVP’d for <strong>Birthday Bash</strong></li>
                  <li>🔔 Reminder set for <strong>Webinar 2025</strong></li>
                </ul>
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
}
