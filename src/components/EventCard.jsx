export default function EventCard({ title, date, location }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-500">{location}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Book Now
      </button>
    </div>
  );
}
