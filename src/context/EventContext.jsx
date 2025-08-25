/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => setEvents([...events, event]);

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}
