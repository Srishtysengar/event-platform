import React, { useState } from "react";

export default function AddEvent() {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const response = await fetch(
        "https://event-platform-93e9c-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        setStatus("✅ Event added successfully!");
        setEvent({ title: "", date: "", location: "", description: "" });
      } else {
        setStatus("❌ Failed to add event.");
      }
    } catch (error) {
      setStatus("⚠️ Error: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Event
        </button>
      </form>
      {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
    </div>
  );
}
