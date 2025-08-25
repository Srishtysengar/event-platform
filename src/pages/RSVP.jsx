/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, XCircle, Bell } from "lucide-react";

export default function RSVPPage() {
  const [guests, setGuests] = useState([
    { id: 1, name: "Alice", status: "attending", note: "Excited to join!" },
    { id: 2, name: "Bob", status: "maybe", note: "Will confirm soon." },
    { id: 3, name: "Charlie", status: "not_attending", note: "Out of town." },
    { id: 4, name: "David", status: "pending", note: "" },
  ]);

  const [reminderSetting, setReminderSetting] = useState("1 week before");

  const statusColors = {
    attending: "bg-green-100 text-green-700 border-green-400",
    maybe: "bg-yellow-100 text-yellow-700 border-yellow-400",
    not_attending: "bg-red-100 text-red-700 border-red-400",
    pending: "bg-gray-100 text-gray-700 border-gray-400",
  };

  const statusIcons = {
    attending: <CheckCircle className="text-green-500 w-5 h-5" />,
    maybe: <Clock className="text-yellow-500 w-5 h-5" />,
    not_attending: <XCircle className="text-red-500 w-5 h-5" />,
    pending: <Bell className="text-gray-500 w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          RSVP Dashboard
        </h1>

        {/* RSVP Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-green-100 rounded-xl text-center shadow">
            <p className="text-lg font-semibold text-green-700">
              {guests.filter((g) => g.status === "attending").length}
            </p>
            <p className="text-sm text-green-600">Attending</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-xl text-center shadow">
            <p className="text-lg font-semibold text-yellow-700">
              {guests.filter((g) => g.status === "maybe").length}
            </p>
            <p className="text-sm text-yellow-600">Maybe</p>
          </div>
          <div className="p-4 bg-red-100 rounded-xl text-center shadow">
            <p className="text-lg font-semibold text-red-700">
              {guests.filter((g) => g.status === "not_attending").length}
            </p>
            <p className="text-sm text-red-600">Not Attending</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl text-center shadow">
            <p className="text-lg font-semibold text-gray-700">
              {guests.filter((g) => g.status === "pending").length}
            </p>
            <p className="text-sm text-gray-600">No Response</p>
          </div>
        </div>

        {/* Guest List */}
        <ul className="divide-y divide-gray-200">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {statusIcons[guest.status]}
                <div>
                  <p className="text-lg font-semibold">{guest.name}</p>
                  <p className="text-sm text-gray-500">{guest.note}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-lg border text-sm font-medium ${statusColors[guest.status]}`}
              >
                {guest.status.replace("_", " ")}
              </span>
            </li>
          ))}
        </ul>

        {/* Reminder Settings */}
        <div className="mt-6 p-4 border rounded-xl bg-indigo-50">
          <h2 className="text-lg font-semibold text-indigo-800 mb-3">
            Automated Reminders
          </h2>
          <label className="block text-sm mb-2 text-gray-600">
            Send reminders:
          </label>
          <select
            value={reminderSetting}
            onChange={(e) => setReminderSetting(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option>1 week before</option>
            <option>3 days before</option>
            <option>1 day before</option>
            <option>On event day</option>
          </select>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
