export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-gray-600">{event.date} • {event.location}</p>
      <p className="text-gray-700 mt-2">{event.description}</p>
    </div>
  );
}
