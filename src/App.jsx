import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventCard from "./components/EventCard";

function App() {
  const events = [
    { title: "Music Concert", date: "Aug 25, 2025", location: "Bangalore" },
    { title: "Tech Meetup", date: "Sep 10, 2025", location: "Hyderabad" },
    { title: "Startup Pitch", date: "Oct 1, 2025", location: "Delhi" },
  ];

  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <EventCard key={i} {...event} />
        ))}
      </section>
    </div>
  );
}

export default App;
