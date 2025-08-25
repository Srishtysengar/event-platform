import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, message: "Your event 'React Meetup' got a new RSVP!" },
    { id: 2, message: "Hackathon starts in 3 days." },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <p className="text-gray-700">{note.message}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
