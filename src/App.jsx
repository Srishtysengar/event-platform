import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Events from "./components/Events";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import RSVPs from "./pages/RSVP";
import Notifications from "./pages/Notification";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateEvent />} />
        <Route path="/dashboard/events" element={<MyEvents />} />
        <Route path="/dashboard/rsvps" element={<RSVPs />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
      </Routes>
    </LayoutWrapper>
  );
}
