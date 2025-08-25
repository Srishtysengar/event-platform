import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { db } from "../firebase"; // 👈 import your firebase config
import { ref, onValue } from "firebase/database";

export default function MyEvents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [events, setEvents] = useState([]);

  // ✅ Fetch events from Firebase Realtime DB
  useEffect(() => {
    const eventsRef = ref(db, "events"); // assuming you store events under "events"
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedEvents = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEvents(loadedEvents);
      } else {
        setEvents([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Filter + Search logic
  const filteredEvents = events
    .filter((event) => filter === "all" || event.type === filter)
    .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📅 My Event Timeline</h1>

        {/* Search + Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full sm:w-1/2">
            <Search className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-gray-50 text-gray-700"
          >
            <option value="all">All Events</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="RSVP-only">RSVP Only</option>
          </select>
        </div>

        {/* Timeline View */}
        <div className="relative border-l-2 border-indigo-300 pl-6 space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="relative bg-indigo-50 rounded-xl p-5 shadow-md hover:shadow-lg transition">
                {/* Timeline Dot */}
                <div className="absolute -left-3 top-5 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white"></div>

                <h2 className="text-xl font-semibold text-indigo-700">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.date} | {event.location}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Type:</span> {event.type}
                </p>

                {/* Highlights */}
                <div className="flex items-center gap-2 mt-2 text-gray-700">
                  <Users size={18} className="text-indigo-600" />
                  <span>{event.attendees} Attendees</span>
                </div>

                {/* View Button */}
                <div className="mt-4">
                  <Link
                    to={`/events/${event.id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    View Event →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No events found.</p>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
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
