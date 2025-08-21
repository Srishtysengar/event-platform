import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import EventCard from "./EventCard";

export default function Events() {
    //using usestate to store the events
    const [events, setEvents] = useState([]);

  //using useEffect to fetch the events
  useEffect(() => {
    const eventsRef = ref(db, "events"); 
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEvents(eventsArray);
      }
    });
  }, []);


  //rendering the event card for each event
  return (
    <section id="events" className="py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
